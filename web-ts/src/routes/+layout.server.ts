import { APP_ROUTES } from '$lib/constants/app-routes.constants';
import { redirect } from '@sveltejs/kit';
import { loadUser } from '$lib/utils/auth.util';

export const ssr = true;
export const csr = true;

export async function load({ cookies, url, locals }) {
	const authenticated = locals.user;

	console.log('authenticated :>> ', authenticated);

	// if (!authenticated && url.pathname !== APP_ROUTES.HOMEPAGE) {
	// 	throw redirect(307, APP_ROUTES.HOMEPAGE);
	// }

	return {
		meta: {
			title: 'Welcome 🎉',
			description: 'Aide Web Interface'
		},
		authenticated
	};
}
