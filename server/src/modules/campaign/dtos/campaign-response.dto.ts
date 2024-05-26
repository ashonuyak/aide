import { UserMappedDto } from 'src/modules/user/dtos/user-mapped.dto';
import { FundraiserCampaignResponseDto } from './fundraiser-campaign-response.dto';

export class CampaignResponseDto extends FundraiserCampaignResponseDto {
	readonly fundraiser!: UserMappedDto;
}
