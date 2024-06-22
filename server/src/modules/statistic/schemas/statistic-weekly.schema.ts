import { Document } from 'mongoose';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { StatisticModel } from './statistic.schema';
import { MergeCollections } from '../enums/merge-collections.enum';

@Schema({
    collection: MergeCollections.week
})
export class StatisticWeeklyModel extends StatisticModel {}

export type StatisticWeeklyDocument = StatisticWeeklyModel & Document;

export const StatisticWeeklySchema = SchemaFactory.createForClass(StatisticWeeklyModel).set('versionKey', false);

StatisticWeeklySchema.index({ timestamp: 1, metadata: 1 });
StatisticWeeklySchema.index({ metadata: 1 });
