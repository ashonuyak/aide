import { APP_ROUTES } from '$lib/constants/app-routes.constants';
import { Role } from '@aide/sdk';
import { redirect } from '@sveltejs/kit';

export const ssr = true;
export const csr = true;

export async function load({ locals }) {
    const authenticated = locals.user;

    console.log('authenticated :>> ', authenticated);

	if (!authenticated || locals.user.role !== Role.Admin) {
        if (!authenticated) {
            throw redirect(307, APP_ROUTES.HOMEPAGE);
        }

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
