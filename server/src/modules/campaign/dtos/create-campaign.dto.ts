import { Transform, Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsDefined,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	ValidateNested
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { ToObjectId } from 'src/common/transforms/to-object-id.transform';

import { CampaignStatus } from '../enums/campaign-status.enum';

import { CategoryAddOns } from './category-add-ons.dto';
import { ScheduleDto } from './schedule.dto';
import { AdditionalLinkDto } from './additional-link.dto';
import { PaymentCardDto } from './payment-cards.dto';

export class CreateCampaignDto {
	@IsDefined()
	@IsString()
	@MaxLength(100)
	readonly title!: string;

	@IsOptional()
	@IsString()
	@MaxLength(200)
	readonly subtitle?: string;

	@IsDefined()
	@IsString()
	@MaxLength(2000)
	readonly description!: string;

	@IsDefined()
	@IsNotEmpty()
	@ToObjectId()
	readonly categoryId!: ObjectId;

	@IsDefined()
	@IsEnum(CampaignStatus)
	readonly status!: CampaignStatus;

	@IsOptional()
	@IsNumber()
	readonly goalAmount?: number;

	@IsOptional()
	@IsString()
	readonly currency?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => ScheduleDto)
	readonly schedule?: ScheduleDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => CategoryAddOns)
	readonly categoryAddOns?: CategoryAddOns;

	@IsDefined()
	@IsBoolean()
	readonly payPalEnabled!: boolean;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => PaymentCardDto)
	readonly paymentCards?: PaymentCardDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AdditionalLinkDto)
	readonly additionalLinks?: AdditionalLinkDto[];

	@IsOptional()
	@IsString()
	readonly qrCodeUrl?: string;
}
