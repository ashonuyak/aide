import type { Status } from '@aide/sdk';

export interface ICampaignCard {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly mainImage: string;
	readonly categoryId: string;
	readonly status: Status;
}
