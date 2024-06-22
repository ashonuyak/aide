import type { Cookies } from '@sveltejs/kit';
import { SERVER_URL } from '$env/static/private';

export function aleop<T>(fn, cookies: Cookies): Promise<T> {
	return fn({
		baseUrl: SERVER_URL,
		credentials: 'include',
		headers: {
			Cookie: cookies.getAll().reduce((acc, { name, value }) => `${acc}${name}=${value};`, '')
		}
	});
}
