import { APP_ROUTES } from '$lib/constants/app-routes.constants';
import { Role } from '@aide/sdk';
import { redirect } from '@sveltejs/kit';

export const ssr = true;
export const csr = true;

export async function load({ locals, ...rest }) {
    const authenticated = locals.user;

	if (!authenticated) {
		throw redirect(307, APP_ROUTES.HOMEPAGE);
	}

	if (authenticated.role !== Role.Admin) {
        throw redirect(307, APP_ROUTES.FUNDRAISER_CAMPAIGNS)
	}

	return {
		meta: {
			title: 'Welcome 🎉',
			description: 'Aide Web Interface'
		},
		authenticated
	};
}
