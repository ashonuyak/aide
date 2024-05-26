import { Status as CampaignStatus } from '@aide/sdk';

export const STATUS = {
	[CampaignStatus.Active]: 'Live',
	[CampaignStatus.Draft]: 'Draft',
	[CampaignStatus.Paused]: 'Paused',
	[CampaignStatus.Deleted]: 'Deleted',
	[CampaignStatus.Closed]: 'Closed'
};
