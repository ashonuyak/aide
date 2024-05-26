import { AideCookie } from '../enums/aide-cookie.enum';

export type CookieResponse = {
	isSecure: boolean;
	values: Array<{ key: AideCookie; value: string }>;
};
