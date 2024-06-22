import { IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { Measurements } from '../enums/measurements.enum';

export class CreateMetadataDto {
    @IsDefined()
    @IsEnum(Measurements)
    readonly type!: string;

    @IsString()
    @IsOptional()
    readonly campaignId?: string;

    @IsNumber()
    @IsOptional()
    readonly categoryId?: string;
}
