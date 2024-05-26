import { aleop } from '$lib/api/aleop.js';
import {
	getAllCategories,
	getCampaignById,
	type CampaignResponseDto,
	type GetCategoryDto
} from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies, params }) {
	const [campaign, categories] = await Promise.all([
		aleop<CampaignResponseDto & { categoryId: string }[]>(
			(opts: Oazapfts.RequestOpts) => getCampaignById({ id: params.id }, opts),
			cookies
		),
		aleop<GetCategoryDto[]>(getAllCategories, cookies)
	]);

	return {
		campaign,
		categories,
		selectedCategory: categories.find((category) => category._id === campaign.categoryId),
		meta: {
			title: 'Fundraising Campaign',
			description: 'Fundraising campaign for users to donate to'
		}
	};
}
