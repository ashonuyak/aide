import { IsDefined, IsEnum } from 'class-validator';
import { CampaignStatus } from '../enums/campaign-status.enum';
import { DeleteCampaignDto } from './delete-campaign.dto';

export class UpdateCampaignStatusDto extends DeleteCampaignDto {
	@IsDefined()
	@IsEnum(CampaignStatus)
	readonly status!: CampaignStatus;
}
