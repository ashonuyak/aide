import { aleop } from '$lib/api/aleop.js';
import {
	getAllCategories,
	getCampaignsByCategoryHandle,
	type CampaignResponseDto,
	type GetCategoryDto
} from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies, params }) {
	const [campaigns, categories] = await Promise.all([
		aleop<CampaignResponseDto[]>(
			(opts: Oazapfts.RequestOpts) =>
				getCampaignsByCategoryHandle(
					{ search: '', categoryHandle: params.categoryHandle },
					opts
				),
			cookies
		),
		aleop<GetCategoryDto[]>(getAllCategories, cookies)
	]);

	return {
		campaigns,
		categories,
		selectedCategory: categories.find((category) => category.handle === params.categoryHandle),
		meta: {
			title: 'Fundraising Campaigns',
			description: 'Fundraising campaigns for users to donate to'
		}
	};
}
