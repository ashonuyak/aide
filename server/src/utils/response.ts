import { CookieOptions, Response } from 'express';
import { AideCookie } from 'src/common/enums/aide-cookie.enum';
import { CookieResponse } from 'src/common/types/cookie-response.type';

export const respondWithCookie = <T>(
	res: Response,
	body: T,
	{ isSecure, values }: CookieResponse
) => {
	const defaults: CookieOptions = {
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		secure: isSecure,
		maxAge: 86_400_000 * 400
	};

	const cookieOptions: Record<AideCookie, CookieOptions> = {
		[AideCookie.AUTH_TYPE]: defaults,
		[AideCookie.ACCESS_TOKEN]: defaults,
		[AideCookie.IS_AUTHENTICATED]: { ...defaults, httpOnly: false }
	};

	for (const { key, value } of values) {
		const options = cookieOptions[key];

		res.cookie(key, value, options);
	}

	return body;
};

export const respondWithoutCookie = <T>(res: Response, body: T, cookies: AideCookie[]) => {
	for (const cookie of cookies) {
		res.clearCookie(cookie);
	}

	return body;
};
