import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TrackMetadataDto {
    @IsString()
    @IsOptional()
    readonly campaignId?: string;

    @IsString()
    @IsOptional()
    readonly categoryId?: string;
}
