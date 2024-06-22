import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Model } from 'mongoose';

import { CreateMetadataDto } from './dto/create-metadata.dto';
import { GetStatisticDto } from './dto/get-statistic.dto';
import { TrackStatisticDto } from './dto/track-statistic.dto';
import { Measurements } from './enums/measurements.enum';
import { MergeCollections } from './enums/merge-collections.enum';
import { TimeUnit } from './enums/time-unit.enum';
import { StatisticDailyDocument, StatisticDailyModel } from './schemas/statistic-daily.schema';
import { StatisticHourlyDocument, StatisticHourlyModel } from './schemas/statistic-hourly.schema';
import {
	StatisticMonthlyDocument,
	StatisticMonthlyModel
} from './schemas/statistic-monthly.schema';
import { StatisticWeeklyDocument, StatisticWeeklyModel } from './schemas/statistic-weekly.schema';
import { StatisticDocument, StatisticModel } from './schemas/statistic.schema';

@Injectable()
export class StatisticRepository {
	constructor(
		@InjectModel(StatisticModel.name)
		private readonly statisticModel: Model<StatisticDocument>,
		@InjectModel(StatisticHourlyModel.name)
		private readonly statisticHourlyModel: Model<StatisticHourlyDocument>,
		@InjectModel(StatisticDailyModel.name)
		private readonly statisticDailyModel: Model<StatisticDailyDocument>,
		@InjectModel(StatisticWeeklyModel.name)
		private readonly statisticWeeklyModel: Model<StatisticWeeklyDocument>,
		@InjectModel(StatisticMonthlyModel.name)
		private readonly statisticMonthlyModel: Model<StatisticMonthlyDocument>
	) {
		dayjs.extend(utc);
	}

	getTimestampFindMatch(startOf: TimeUnit, endOf: TimeUnit) {
		return {
			$gte: dayjs().utc().startOf(startOf),
			$lte: dayjs().utc().endOf(endOf).subtract(1, endOf)
		};
	}

	get multiCollectionConfig() {
		return [
			{
				collection: this.statisticModel,
				timestamp: {
					$gte: this.getTimestampFindMatch(TimeUnit.hour, TimeUnit.hour).$gte,
					$lte: dayjs().utc()
				}
			},
			{
				collection: this.statisticHourlyModel,
				timestamp: this.getTimestampFindMatch(TimeUnit.day, TimeUnit.hour)
			},
			{
				collection: this.statisticDailyModel,
				timestamp: this.getTimestampFindMatch(TimeUnit.week, TimeUnit.day)
			},
			{
				collection: this.statisticWeeklyModel,
				timestamp: this.getTimestampFindMatch(TimeUnit.month, TimeUnit.week)
			},
			{
				collection: this.statisticMonthlyModel,
				timestamp: {
					$gte: dayjs().utc().subtract(5, TimeUnit.year),
					$lte: this.getTimestampFindMatch(TimeUnit.month, TimeUnit.month).$lte
				}
			}
		];
	}

	async mongoFind(
		{ start, end, ...metadata }: GetStatisticDto,
		projection?: any
	): Promise<StatisticDocument[]> {
		const dayJsStart = dayjs(start);
		const dayJsEnd = dayjs(end);

		const relevantCollections = this.multiCollectionConfig
			.filter(
				(collection) =>
					dayJsStart.isBefore(collection.timestamp.$lte) &&
					dayJsEnd.isAfter(collection.timestamp.$gte)
			)
			.map((collection) => ({
				...collection,
				timestamp: {
					$gte: collection.timestamp.$gte.toDate(),
					$lte: collection.timestamp.$lte.toDate()
				}
			}));

		const metadataMatch = Object.entries(metadata).reduce(
			(acc, [k, v]) => ({ ...acc, [`metadata.${k}`]: v }),
			{}
		);

		const relevantCollectionsPromises = relevantCollections.map(({ collection, timestamp }) =>
			collection
				.find(
					{
						timestamp,
						...metadataMatch
					},
					projection
				)
				.lean()
		);

		return (await Promise.all(relevantCollectionsPromises)).flat();
	}

	async find(filter: any, group: any, sort: any, limit: number) {
		const { collection, timestamp } = {
			...this.multiCollectionConfig[0],
			timestamp: {
				$gte: this.multiCollectionConfig[0].timestamp.$gte.toDate(),
				$lte: this.multiCollectionConfig[0].timestamp.$lte.toDate()
			}
		};

		const unionCollections = this.multiCollectionConfig.slice(1).map((collection) => ({
			...collection,
			timestamp: {
				$gte: collection.timestamp.$gte.toDate(),
				$lte: collection.timestamp.$lte.toDate()
			}
		}));

		const aggregationQuery: any = [
			{
				$match: {
					timestamp,
					...filter
				}
			}
		];

		aggregationQuery.push(
			...unionCollections.map(({ collection, timestamp }) => ({
				$unionWith: {
					coll: collection.collection.name,
					pipeline: [
						{
							$match: {
								timestamp,
								...filter
							}
						}
					]
				}
			})),
			{
				$group: {
					_id: group,
					value: { $sum: '$click' }
				}
			},
			{
				$sort: sort
			},
			{
				$limit: limit
			},
			{
				$addFields: {
					campaignId: { $toObjectId: '$_id.campaignId' }
				}
			},
			{
				$lookup: {
					from: 'campaign',
					localField: 'campaignId',
					foreignField: '_id',
					as: 'campaign'
				}
			},
			{
				$unwind: '$campaign'
			},
            {
                $replaceRoot: {
                    newRoot: '$campaign'
                }
            },
			{
				$lookup: {
					from: 'user',
					let: { fundraiserId: '$fundraiserId' },
					pipeline: [
						{
							$match: {
								$expr: { $eq: ['$_id', '$$fundraiserId'] }
							}
						},
						{
							$project: {
								firstName: 1,
								lastName: 1,
								avatarUrl: 1,
								username: 1,
								email: 1
							}
						}
					],
					as: 'fundraiser'
				}
			},
            {
				$unwind: '$fundraiser'
			}
		);

		return collection.aggregate(aggregationQuery);
	}

	public create(
		data: TrackStatisticDto & { metadata: CreateMetadataDto }
	): Promise<StatisticDocument> {
		console.log('data :>> ', data);

		return this.statisticModel.create({
			...data
		});
	}

	public merge(collection: MergeCollections): Promise<StatisticDocument[]> {
		const mergeConfig = this.getMergeConfig(collection);

		return mergeConfig.mergeFrom.aggregate([
			{
				$match: {
					timestamp: mergeConfig.timestamp
				}
			},
			{
				$project: {
					date: {
						$dateToParts: { date: '$timestamp' }
					},
					metadata: 1,
					...this.measurementsProjectStage
				}
			},
			{
				$group: {
					_id: {
						date: {
							year: '$date.year',
							month: '$date.month'
						},
						metadata: '$metadata'
					},
					...this.measurementsGroupStage
				}
			},
			{
				$project: {
					timestamp: mergeConfig.timestamp.$gte,
					metadata: '$_id.metadata',
					...this.measurementsConditionalProjectStage,
					_id: 0
				}
			},
			{
				$merge: { into: mergeConfig.mergeTo, whenMatched: 'replace' }
			}
		]);
	}

	static measurements = [
		{
			name: Measurements.click,
			aggregationOperator: '$sum'
		},
		{
			name: Measurements.categoryClick,
			aggregationOperator: '$sum'
		},
		{
			name: Measurements.impression,
			aggregationOperator: '$sum'
		}
	];

	private measurementsProjectStage = StatisticRepository.measurements.reduce(
		(acc, { name }) => ({
			...acc,
			[name]: 1
		}),
		{}
	);

	private measurementsConditionalProjectStage = StatisticRepository.measurements.reduce(
		(acc, { name }) => ({
			...acc,
			[name]: { $cond: [{ $eq: [`$${name}`, 0] }, '$$REMOVE', `$${name}`] }
		}),
		{}
	);

	private measurementsGroupStage = StatisticRepository.measurements.reduce(
		(acc, { name, aggregationOperator }) => ({
			...acc,
			[name]: { [aggregationOperator]: `$${name}` }
		}),
		{}
	);

	private getTimestampMatch(timeUnit: TimeUnit) {
		return {
			$gte: dayjs().utc().startOf(timeUnit).subtract(1, timeUnit).toDate(),
			$lte: dayjs().utc().endOf(timeUnit).subtract(1, timeUnit).toDate()
		};
	}

	private getMergeConfig(collection: MergeCollections) {
		return {
			[this.statisticHourlyModel.collection.name]: () => ({
				mergeFrom: this.statisticModel,
				mergeTo: this.statisticHourlyModel.collection.name,
				timestamp: this.getTimestampMatch(TimeUnit.hour)
			}),
			[this.statisticDailyModel.collection.name]: () => ({
				mergeFrom: this.statisticHourlyModel,
				mergeTo: this.statisticDailyModel.collection.name,
				timestamp: this.getTimestampMatch(TimeUnit.day)
			}),
			[this.statisticWeeklyModel.collection.name]: () => ({
				mergeFrom: this.statisticDailyModel,
				mergeTo: this.statisticWeeklyModel.collection.name,
				timestamp: this.getTimestampMatch(TimeUnit.week)
			}),
			[this.statisticMonthlyModel.collection.name]: () => ({
				mergeFrom: this.statisticWeeklyModel,
				mergeTo: this.statisticMonthlyModel.collection.name,
				timestamp: this.getTimestampMatch(TimeUnit.month)
			})
		}[collection]();
	}
}
