import { Role } from 'src/modules/auth/enums/roles.enum';

export class UserMappedDto {
	readonly _id!: string;
	readonly email!: string;
	readonly username!: string;
	readonly role!: Role;
	readonly avatarUrl?: string;
	readonly firstName?: string;
	readonly lastName?: string;
	readonly createdAt!: Date;
	readonly initials!: string;
	readonly blocked?: boolean;
}
