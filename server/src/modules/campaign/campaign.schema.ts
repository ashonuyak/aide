import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { AdditionalLinkDto } from './dtos/additional-link.dto';
import { CategoryAddOns } from './dtos/category-add-ons.dto';
import { PaymentCardDto } from './dtos/payment-cards.dto';
import { ScheduleDto } from './dtos/schedule.dto';
import { CampaignStatus } from './enums/campaign-status.enum';

@Schema({
	timestamps: true,
	collection: 'campaign',
	autoCreate: true,
	autoIndex: true
})
export class CampaignModel extends Document {
	declare _id: string;

	@Prop({
		type: String,
		required: true,
		index: true
	})
	readonly title!: string;

	@Prop({
		type: String,
		required: false,
		index: true,
		default: ''
	})
	readonly subtitle!: string;

	@Prop({
		type: String,
		required: true,
		index: true
	})
	readonly description!: string;

	@Prop({
		type: String,
		required: true
	})
	readonly mainImage!: string;

	@Prop({
		type: Array,
		required: true
	})
	readonly media!: string[];

	@Prop({
		type: ObjectId,
		required: true
	})
	readonly categoryId!: ObjectId;

	@Prop({
		type: ObjectId,
		required: true,
		index: true
	})
	readonly fundraiserId!: ObjectId;

	@Prop({
		type: String,
		required: true,
		enum: CampaignStatus,
		index: true
	})
	readonly status!: CampaignStatus;

	@Prop({
		type: String,
		required: false,
		default: null
	})
	readonly qrCode!: string | null;

	@Prop({
		type: String,
		required: false,
		default: null
	})
	readonly qrCodeUrl!: string | null;

	@Prop({
		type: Array,
		required: false,
		default: []
	})
	readonly additionalLinks!: AdditionalLinkDto[];

	@Prop({
		type: Object,
		required: false,
		default: {}
	})
	readonly categoryAddOns!: CategoryAddOns;

	@Prop({
		type: Boolean,
		required: true
	})
	readonly payPalEnabled!: boolean;

	@Prop({
		type: Array,
		required: false,
		default: []
	})
	readonly paymentCards!: PaymentCardDto[];

	@Prop({
		type: Boolean,
		required: false,
		default: false
	})
	readonly blocked!: boolean;
}

export type CampaignDocument = CampaignModel;

export const CampaignSchema = SchemaFactory.createForClass(CampaignModel).set('versionKey', false);
