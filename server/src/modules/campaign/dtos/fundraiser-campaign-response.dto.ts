import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CampaignStatus } from '../enums/campaign-status.enum';
import { AdditionalLinkDto } from './additional-link.dto';
import { CategoryAddOns } from './category-add-ons.dto';
import { PaymentCardDto } from './payment-cards.dto';
import { ScheduleDto } from './schedule.dto';

export class FundraiserCampaignResponseDto {
	readonly _id!: string;

	readonly title!: string;

	readonly subtitle!: string;

	readonly description!: string;

	readonly mainImage!: string;

	readonly media!: string[];

	@ApiProperty({ required: true, type: String })
	readonly categoryId!: ObjectId;

	@ApiProperty({ required: true, type: String })
	readonly fundraiserId!: ObjectId;

	readonly status!: CampaignStatus;

	readonly qrCode!: string | null;

	readonly qrCodeUrl!: string | null;

	readonly additionalLinks!: AdditionalLinkDto[];

	readonly categoryAddOns!: CategoryAddOns;
	
	readonly payPalEnabled!: boolean;
	
	readonly paymentCards!: PaymentCardDto[];
	
	readonly goalAmount?: number;

	readonly currentAmount?: number;

	readonly currency?: string;

	readonly startDate?: Date;

	readonly endDate?: Date;

	readonly schedule?: ScheduleDto;
}
