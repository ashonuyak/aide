import { aleop } from '$lib/api/aleop.js';
import { getFundraisers, type UserMappedDto } from '@aide/sdk';
import * as Oazapfts from '@oazapfts/runtime';

export async function load({ cookies }) {
	const fundraisers = await aleop<UserMappedDto[]>(
		(opts: Oazapfts.RequestOpts) => getFundraisers({ search: '' }, opts),
		cookies
	);

	return {
		fundraisers,
		meta: { title: 'Admin Fundraisers', description: "Admin Fundraiser's page" }
	};
}
