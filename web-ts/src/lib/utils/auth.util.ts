import { browser } from '$app/environment';
import { aleop } from '$lib/api/aleop';
import { APP_ROUTES } from '$lib/constants/app-routes.constants';
import { resetSavedUser, user } from '$lib/stores/user.store';
import { Role } from '@aide/sdk';
import { getMyself } from '@aide/sdk';
import { redirect, type Cookies } from '@sveltejs/kit';
import { get } from 'svelte/store';

export interface AuthOptions {
	admin?: true;
	public?: true;
}

export const loadUser = async (cookies: Cookies) => {
	try {
		let loaded = get(user);

		console.log('loaded :>> ', loaded);

		if (!loaded && hasAuthCookie(cookies)) {
			loaded = await aleop(getMyself, cookies);
		}
		user.set(loaded);

		return loaded;
	} catch  (err) {
		console.log('err :>> ', err);

		return null;
	}
};

const hasAuthCookie = (cookies: Cookies): boolean => {
	return !!cookies.get('aide_is_authenticated')
};

export const authenticate = async (options?: AuthOptions) => {
	// const { public: publicRoute, admin: adminRoute } = options || {};
	// const user = await loadUser();

	// if (publicRoute) {
	// 	return;
	// }

	// if (!user) {
	// 	redirect(302, APP_ROUTES.LOG_IN);
	// }

	// if (adminRoute && user.role !== Role.Admin) {
	// 	redirect(302, APP_ROUTES.CAMPAIGNS);
	// }
};
