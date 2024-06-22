import { aleop } from '$lib/api/aleop.js';
import { getAdminCategories, type GetCategoryDto } from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies }) {
	const categories = await aleop<GetCategoryDto[]>(
		(opts: Oazapfts.RequestOpts) => getAdminCategories(opts),
		cookies
	);

    console.log('categories :>> ', categories);

	return {
		categories,
		meta: { title: 'Admin Categories', description: "Admin Categories' page" }
	};
}
