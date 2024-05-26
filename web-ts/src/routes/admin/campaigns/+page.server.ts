import { aleop } from '$lib/api/aleop.js';
import { getAllCampaigns, type FundraiserCampaignResponseDto } from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies }) {
	const campaigns = await aleop<FundraiserCampaignResponseDto[]>(
		(opts: Oazapfts.RequestOpts) => getAllCampaigns({ search: '' }, opts),
		cookies
	);

	return {
		campaigns,
		meta: { title: 'Admin Campaigns', description: "Admin Campaigns' page" }
	};
}
