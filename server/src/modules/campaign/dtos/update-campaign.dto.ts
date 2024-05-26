import { PartialType } from '@nestjs/mapped-types';

import { IsDefined, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ToObjectId } from 'src/common/transforms/to-object-id.transform';
import { CreateCampaignDto } from './create-campaign.dto';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
	@IsDefined()
	@IsNotEmpty()
	@ToObjectId()
	readonly _id!: ObjectId;
}
