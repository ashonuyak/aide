import { aleop } from '$lib/api/aleop.js';
import { Measurements } from '$lib/api/index.js';
import {
	getAllCategories,
	getCampaignById,
	getTopCampaigns,
	getTopCampaignsCategory,
	type CampaignResponseDto,
	type GetCategoryDto
} from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies, params }) {
	const [campaign, categories, topCampaigns] = await Promise.all([
		aleop<CampaignResponseDto & { categoryId: string }[]>(
			(opts: Oazapfts.RequestOpts) => getCampaignById({ id: params.id }, opts),
			cookies
		),
		aleop<GetCategoryDto[]>(getAllCategories, cookies),
		aleop<CampaignResponseDto[]>(
			(opts: Oazapfts.RequestOpts) => getTopCampaigns({ $type: Measurements.click }, opts),
			cookies
		)
	]);

	const topCategoryCampaigns = await aleop<CampaignResponseDto[]>(
		(opts: Oazapfts.RequestOpts) => getTopCampaignsCategory({ $type: Measurements.click, categoryId: campaign.categoryId }, opts),
		cookies
	)

	return {
		campaign,
		categories,
		selectedCategory: categories.find((category) => category._id === campaign.categoryId),
		topCampaigns,
		topCategoryCampaigns,
		meta: {
			title: 'Fundraising Campaign',
			description: 'Fundraising campaign for users to donate to'
		}
	};
}
