import { PartialType } from '@nestjs/swagger';
import { CreateCampaignFilesDto } from './create-campaign-files.dto';

export class UpdateCampaignFilesDto extends PartialType(CreateCampaignFilesDto) {}
