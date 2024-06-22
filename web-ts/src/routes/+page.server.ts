import { aleop } from '$lib/api/aleop.js';
import { Measurements } from '$lib/api/index.js';
import {
    getAllCategories,
	getTopCampaigns,
	getTopCampaignsCategory,
	type CampaignResponseDto,
    type GetCategoryDto,
} from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies }) {
	const [topCampaigns, zsuCampaigns, categories] = await Promise.all([
		aleop<CampaignResponseDto[]>(
			(opts: Oazapfts.RequestOpts) => getTopCampaigns({ $type: Measurements.click }, opts),
			cookies
		),
        aleop<CampaignResponseDto[]>(
            (opts: Oazapfts.RequestOpts) => getTopCampaignsCategory({ $type: Measurements.click, categoryId: '6639fac9dd153301e7e4c3fe' }, opts),
            cookies
        ),
        aleop<GetCategoryDto[]>(getAllCategories, cookies)
	]);

	return {
		topCampaigns,
		zsuCampaigns,
        categories
	};
}
