import { aleop } from '$lib/api/aleop';
import { APP_ROUTES } from '$lib/constants/app-routes.constants';
import { getMyself } from '@aide/sdk';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	try {
		if (!event.isDataRequest && ['fundraiser/', 'admin/'].some((el) => event.url.pathname.includes(el))) {
			const user = await aleop(getMyself, event.cookies);

			event.locals.user = user;
		}
	} catch (err) {
		if (err.status === 401) throw redirect(307, APP_ROUTES.HOMEPAGE);


		event.locals.user = null;
	}

	return await resolve(event);
}
