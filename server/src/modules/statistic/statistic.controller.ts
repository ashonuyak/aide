import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ObjectId } from 'mongodb';
import { ValidateEnum } from 'src/common/pipes/validate-enum.pipe';
import { TrackStatisticDto } from './dto/track-statistic.dto';
import { Measurements } from './enums/measurements.enum';
import { MergeCollections } from './enums/merge-collections.enum';
import { TimeUnit } from './enums/time-unit.enum';
import { StatisticDocument } from './schemas/statistic.schema';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) {}

	@Post('/:type')
	trackStatistic(
		@Body() body: TrackStatisticDto,
		@Param('type') type: Measurements
	): Promise<StatisticDocument> {
		return this.statisticService.track(type, body);
	}

	@Post('/merge/:range')
	merge(
		@Param('range', new ValidateEnum(TimeUnit, true)) range: TimeUnit
	): Promise<StatisticDocument[]> {
		return this.statisticService.merge((MergeCollections as any)[range]);
	}

	@Get('/top-campaigns')
	getTopCampaigns(@Query('type', new ValidateEnum(Measurements, true)) type: Measurements) {
		return this.statisticService.getTopCampaigns(type);
	}

	@Get('/top-campaigns-category')
	getTopCampaignsCategory(
		@Query('type', new ValidateEnum(Measurements, true)) type: Measurements,
		@Query('categoryId') categoryId: string
	) {
		return this.statisticService.getTopCampaigns(type, categoryId);
	}

	// @Get('/dashboard')
	// getDashboardStatistic(
	//     @ShopifyGraphql() { client, session }: ShopifyGraphqlSession,
	//     @Query('start') start: string,
	//     @Query('end') end: string
	// ): Promise<DashboardStatisticDto> {
	//     return this.statisticService.getDashboardStatistic(client, {
	//         shopId: session.shopShopifyId,
	//         start: new Date(start),
	//         end: end && end !== 'null' ? new Date(end) : new Date()
	//     });
	// }
}
