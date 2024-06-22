import { Document } from 'mongoose';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { StatisticModel } from './statistic.schema';
import { MergeCollections } from '../enums/merge-collections.enum';

@Schema({
    collection: MergeCollections.day
})
export class StatisticDailyModel extends StatisticModel {}

export type StatisticDailyDocument = StatisticDailyModel & Document;

export const StatisticDailySchema = SchemaFactory.createForClass(StatisticDailyModel).set('versionKey', false);

StatisticDailySchema.index({ timestamp: 1, metadata: 1 });
StatisticDailySchema.index({ metadata: 1 });
