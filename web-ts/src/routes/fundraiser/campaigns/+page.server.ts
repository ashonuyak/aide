import { aleop } from '$lib/api/aleop.js';
import { getAllCategories, getMyCampaigns, type FundraiserCampaignResponseDto, type GetCategoryDto } from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies }) {
	const [campaigns, categories] = await Promise.all([
		aleop<FundraiserCampaignResponseDto[]>(
			(opts: Oazapfts.RequestOpts) => getMyCampaigns({ search: '', status: '' }, opts),
			cookies
		),
		aleop<GetCategoryDto[]>(getAllCategories, cookies)
	]);

	return {
		campaigns,
		categories,
		meta: { title: 'Campaigns', description: "Fundraiser's page with created campaigns" }
	};
}
