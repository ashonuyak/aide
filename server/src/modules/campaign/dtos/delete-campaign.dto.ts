import { IsDefined, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ToObjectId } from 'src/common/transforms/to-object-id.transform';

export class DeleteCampaignDto {
	@IsDefined()
	@IsNotEmpty()
	@ToObjectId()
	readonly _id!: ObjectId;
}
