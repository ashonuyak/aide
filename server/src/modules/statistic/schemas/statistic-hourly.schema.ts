import { Document } from 'mongoose';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { StatisticModel } from './statistic.schema';
import { MergeCollections } from '../enums/merge-collections.enum';

@Schema({
    collection: MergeCollections.hour
})
export class StatisticHourlyModel extends StatisticModel {}

export type StatisticHourlyDocument = StatisticHourlyModel & Document;

export const StatisticHourlySchema = SchemaFactory.createForClass(StatisticHourlyModel).set('versionKey', false);

StatisticHourlySchema.index({ timestamp: 1, metadata: 1 });
StatisticHourlySchema.index({ metadata: 1 });
