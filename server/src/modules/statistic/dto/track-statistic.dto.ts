import { Type } from 'class-transformer';
import {
    IsDate, IsDefined, IsNumber, IsOptional, ValidateNested,
} from 'class-validator';

import { TrackMetadataDto } from './track-metadata.dto';

export class TrackStatisticDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => TrackMetadataDto)
    readonly metadata!: TrackMetadataDto;

    @IsDate()
    @IsOptional()
    readonly timestamp?: Date;

    @IsNumber()
    @IsOptional()
    readonly click?: number;

    @IsNumber()
    @IsOptional()
    readonly categoryClick?: number;

    @IsNumber()
    @IsOptional()
    readonly impression?: number;
}
