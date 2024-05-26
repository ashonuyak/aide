// export async function handleFetch({ event, request, fetch }) {
// 	console.log('event :>> ', event);

import { aleop } from '$lib/api/aleop';
import { getMyself } from '@aide/sdk';
import type { Cookies } from '@sveltejs/kit';

//     console.log('request :>> ', request);

// 	return await fetch(request);
// }

export async function handle({ event, resolve }) {
	try {
		if (!event.isDataRequest) {
			const user = await aleop(getMyself, event.cookies);

			event.locals.user = user;
		}
	} catch {}

	return await resolve(event);
}
