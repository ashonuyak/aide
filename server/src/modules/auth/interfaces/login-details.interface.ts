export interface LoginDetails {
	readonly isSecure: boolean;

	readonly clientIp?: string;

	readonly deviceType: string;

	readonly deviceOS: string;
}
