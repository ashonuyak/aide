import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MediaModule } from '../media/media.module';
import { CampaignController } from './campaign.controller';
import { CampaignRepository } from './campaign.repository';
import { CampaignModel, CampaignSchema } from './campaign.schema';
import { CampaignService } from './campaign.service';
import { CategoryModule } from '../category/category.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: CampaignModel.name,
				schema: CampaignSchema
			}
		]),
		MediaModule,
		CategoryModule
	],
	providers: [CampaignRepository, CampaignService],
	controllers: [CampaignController],
	exports: [CampaignService]
})
export class CampaignModule {}
