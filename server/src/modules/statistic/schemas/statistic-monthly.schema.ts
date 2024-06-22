import { Document } from 'mongoose';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { StatisticModel } from './statistic.schema';
import { MergeCollections } from '../enums/merge-collections.enum';

@Schema({
    collection: MergeCollections.month
})
export class StatisticMonthlyModel extends StatisticModel {}

export type StatisticMonthlyDocument = StatisticMonthlyModel & Document;

export const StatisticMonthlySchema = SchemaFactory.createForClass(StatisticMonthlyModel).set('versionKey', false);

StatisticMonthlySchema.index({ timestamp: 1, metadata: 1 });
StatisticMonthlySchema.index({ metadata: 1 });
