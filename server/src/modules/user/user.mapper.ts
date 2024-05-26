import { Injectable } from '@nestjs/common';
import { UserMappedDto } from './dtos/user-mapped.dto';
import { UserDocument } from './user.schema';

@Injectable()
export class UserMapper {
	constructor() {}

	toDto(user: UserDocument): UserMappedDto {
		return {
			_id: user._id.toString(),
			username: user.username,
			email: user.email,
			role: user.role,
			avatarUrl: user.avatarUrl,
			firstName: user.firstName,
			lastName: user.lastName,
			createdAt: user.createdAt,
			initials: user.initials,
			blocked: user.blocked
		};
	}
}
