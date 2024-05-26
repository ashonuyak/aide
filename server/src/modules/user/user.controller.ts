import { Controller, Get, Logger, Param, Query } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthSession } from 'src/common/decorators/session.decorator';
import { Session } from 'src/common/interfaces/session.interface';
import { Role } from '../auth/enums/roles.enum';
import { UserMappedDto } from './dtos/user-mapped.dto';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
	logger = new Logger(UserController.name);

	constructor(
		private readonly userMapper: UserMapper,
		private readonly userService: UserService
	) {}

	@Get('me')
	@SkipThrottle()
	@Roles(Role.Admin, Role.Fundraiser, Role.User)
	getMyself(@AuthSession() session: Session): UserMappedDto {
		return this.userMapper.toDto(session.user);
	}

	@Get('fundraisers')
	@Roles(Role.Admin)
	async getFundraisers(@Query('search') search?: string): Promise<UserMappedDto[]> {
		const fundraisers = await this.userService.find(
			{
				role: Role.Fundraiser,
				...(search && {
					$or: [
						{ username: { $regex: search, $options: 'i' } },
						{ lastName: { $regex: search, $options: 'i' } },
						{ firstName: { $regex: search, $options: 'i' } }
					]
				})
			},
			null,
			{ createdAt: -1 }
		);

		return fundraisers.map(this.userMapper.toDto);
	}
}
