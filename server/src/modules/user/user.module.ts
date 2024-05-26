import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserModel, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: UserModel.name,
				schema: UserSchema
			}
		])
	],
	providers: [UserRepository, UserService, UserMapper],
	controllers: [UserController],
	exports: [UserService]
})
export class UserModule {}
