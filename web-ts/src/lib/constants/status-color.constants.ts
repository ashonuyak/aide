import { Status as CampaignStatus } from '@aide/sdk';

export const STATUS_COLOR = {
	[CampaignStatus.Active]: '#B4FED2',
	[CampaignStatus.Draft]: '#9ec7f5',
	[CampaignStatus.Paused]: '#d1d0d0',
    [CampaignStatus.Closed]: '#fff',
    [CampaignStatus.Deleted]: 'Deleted'
};
