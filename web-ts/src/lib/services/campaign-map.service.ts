import type { ICampaignCard } from '$lib/page-components/CampaignCard/campaign-card.interface';
import type { CampaignResponseDto, FundraiserCampaignResponseDto } from '@aide/sdk';

export const mapCampaignCard = (campaign: CampaignResponseDto | FundraiserCampaignResponseDto): ICampaignCard => ({
	title: campaign.title,
	subtitle: campaign.subtitle,
	description: campaign.description,
	mainImage: campaign.mainImage,
	categoryId: campaign.categoryId,
	status: campaign.status
});
