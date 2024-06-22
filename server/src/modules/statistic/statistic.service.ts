import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { ObjectId } from 'mongodb';
import { TrackStatisticDto } from './dto/track-statistic.dto';
import { Measurements } from './enums/measurements.enum';
import { MergeCollections } from './enums/merge-collections.enum';
import { StatisticDocument } from './schemas/statistic.schema';
import { StatisticRepository } from './statistic.repository';

@Injectable()
export class StatisticService {
	constructor(private readonly statisticRepository: StatisticRepository) {}

	private getMetricsTotal(values: Partial<StatisticDocument>[], metricName: string) {
		return values.reduce((acc, cur) => acc + (cur as any)[metricName], 0);
	}

	formatChart(values: Partial<StatisticDocument>[], metricName: string, start: Date, end: Date) {
		const data = values.map(({ timestamp, ...rest }) => ({
			timestamp,
			value: (rest as any)[metricName]
		}));

		const timeSeries = {};
		const startDate = dayjs(start);
		const endDate = dayjs(end);

		const isHourly = endDate.diff(startDate, 'day') < 1;

		if (isHourly) {
			for (
				let d = startDate;
				d.isBefore(endDate) || d.isSame(endDate, 'hour');
				d = d.add(1, 'hour')
			) {
				const formattedDate = d.startOf('hour').format();
				(timeSeries as any)[formattedDate] = 0;
			}
		} else {
			for (
				let d = startDate;
				d.isBefore(endDate) || d.isSame(endDate, 'day');
				d = d.add(1, 'day')
			) {
				const formattedDate = d.startOf('day').format();
				(timeSeries as any)[formattedDate] = 0;
			}
		}

		data.forEach(({ timestamp, value }) => {
			const formattedDate = isHourly
				? dayjs(timestamp).startOf('hour').format()
				: dayjs(timestamp).startOf('day').format();

			if (timeSeries.hasOwnProperty(formattedDate)) {
				(timeSeries as any)[formattedDate] += value;
			}
		});

		const chartData = Object.keys(timeSeries).map((date) => ({
			timestamp: date,
			value: (timeSeries as any)[date]
		}));

		return chartData;
	}

	async getTopCampaigns(type: Measurements, categoryId?: string) {
		return this.statisticRepository.find(
			{ 'metadata.type': type, ...(categoryId && { 'metadata.categoryId': categoryId }) },
			{ campaignId: '$metadata.campaignId' },
			{ click: -1 },
			4
		);
	}

	// async getDashboardStatistic({ start, end, shopId }: GetStatisticDto): Promise<DashboardStatisticDto> {
	//     const currency = await this.shopService.client(client).getCurrency();

	//     const mongoQuery = { start, end, shopId };
	//     const projection = { timestamp: 1, revenue: 1, click: 1, view: 1 };

	//     const viewPromise = this.statisticRepository.mongoFind({ ...mongoQuery, type: Measurements.view }, projection);
	//     const clickPromise = this.statisticRepository.mongoFind({ ...mongoQuery, type: Measurements.click }, projection);
	//     const revenuePromise = this.statisticRepository.mongoFind({ ...mongoQuery, type: Measurements.revenue, currency }, projection);

	//     const [view, click, revenue] = await Promise.all([viewPromise, clickPromise, revenuePromise]);

	//     const sold = revenue.map(({ timestamp }) => ({ timestamp, sold: 1 }));

	//     const metrics = { view, click, revenue, sold };

	//     return Object.entries(metrics).reduce(
	//         (acc, [name, value]) => ({ ...acc, [name]: { total: this.getMetricsTotal(value, name), chart: this.formatChart(value, name, start, end) } }),
	//         {}
	//     ) as DashboardStatisticDto;
	// }

	async track(type: Measurements, data: TrackStatisticDto): Promise<StatisticDocument> {
		return this.statisticRepository.create({
			...data,
			timestamp: new Date(),
			metadata: {
				...data.metadata,
				type
			}
		});
	}

	merge(collection: MergeCollections): Promise<StatisticDocument[]> {
		return this.statisticRepository.merge(collection);
	}
}
