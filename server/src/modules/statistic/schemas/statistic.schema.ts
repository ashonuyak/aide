import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CreateMetadataDto } from '../dto/create-metadata.dto';

@Schema({
    timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'seconds'
    },
    collection: 'statisticmodel'
})
export class StatisticModel {
    @Prop({
        type: Date,
        required: true
    })
    timestamp!: Date;

    @Prop({
        type: Object,
        required: true
    })
    metadata!: CreateMetadataDto;

    @Prop({
        type: Number,
        required: false
    })
    click?: number;

    @Prop({
        type: Number,
        required: false
    })
    impression?: number;

    @Prop({
        type: Number,
        required: false
    })
    categoryClick?: number;

    @Prop({
        type: Number,
        required: false
    })
    addToCart?: number;
}

export type StatisticDocument = StatisticModel & Document;

export const StatisticSchema = SchemaFactory.createForClass(StatisticModel).set('versionKey', false);

StatisticSchema.index({ timestamp: 1, metadata: 1 });
StatisticSchema.index({ metadata: 1 });
