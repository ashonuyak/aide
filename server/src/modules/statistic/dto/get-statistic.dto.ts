import { IsDate, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { PartialMetadataDto } from './partial-metadata.dto';

export class GetStatisticDto extends PartialMetadataDto {
    @IsDate()
    @Type(() => Date)
    readonly start!: Date;

    @IsDate()
    @Type(() => Date)
    readonly end!: Date;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly shopId!: number;
}
