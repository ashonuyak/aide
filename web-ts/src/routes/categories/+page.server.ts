import { aleop } from '$lib/api/aleop.js';
import { getAllCategories, type GetCategoryDto } from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies }) {
	const categories = await aleop<GetCategoryDto[]>(
		(opts: Oazapfts.RequestOpts) => getAllCategories(opts),
		cookies
	);

	return {
		categories,
		meta: { title: 'Categories', description: 'Categories page' }
	};
}
