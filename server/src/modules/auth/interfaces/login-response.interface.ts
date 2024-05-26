import { Role } from '../enums/roles.enum';

export interface LoginResponse {
	readonly accessToken: string;

	readonly userId: string;

	readonly email: string;

	readonly username: string;

	readonly avatarUrl?: string;

	readonly role: Role;
}
