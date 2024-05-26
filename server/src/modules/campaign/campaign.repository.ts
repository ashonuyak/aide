import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/utils/generic-repository';

import { CampaignDocument, CampaignModel } from './campaign.schema';

@Injectable()
export class CampaignRepository extends GenericRepository<CampaignDocument>(CampaignModel) {}
