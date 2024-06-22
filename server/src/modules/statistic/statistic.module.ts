import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { StatisticRepository } from './statistic.repository';
import { StatisticSchema, StatisticModel } from './schemas/statistic.schema';
import { StatisticHourlyModel, StatisticHourlySchema } from './schemas/statistic-hourly.schema';
import { StatisticDailyModel, StatisticDailySchema } from './schemas/statistic-daily.schema';
import { StatisticWeeklyModel, StatisticWeeklySchema } from './schemas/statistic-weekly.schema';
import { StatisticMonthlyModel, StatisticMonthlySchema } from './schemas/statistic-monthly.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: StatisticModel.name,
                schema: StatisticSchema
            },
            {
                name: StatisticHourlyModel.name,
                schema: StatisticHourlySchema
            },
            {
                name: StatisticDailyModel.name,
                schema: StatisticDailySchema
            },
            {
                name: StatisticWeeklyModel.name,
                schema: StatisticWeeklySchema
            },
            {
                name: StatisticMonthlyModel.name,
                schema: StatisticMonthlySchema
            }
        ])
    ],
    controllers: [StatisticController],
    providers: [StatisticService, StatisticRepository],
    exports: [StatisticService]
})
export class StatisticModule {}
