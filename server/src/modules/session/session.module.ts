import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModel, UserSchema } from '../user/user.schema';

import { SessionRepository } from './session.repository';
import { SessionModel, SessionSchema } from './session.schema';
import { SessionService } from './session.service';
import { SessionController } from './session.controller.';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: SessionModel.name,
				schema: SessionSchema
			},
			{
				name: UserModel.name,
				schema: UserSchema
			}
		])
	],
	providers: [SessionRepository, SessionService],
	exports: [SessionService],
	controllers: [SessionController]
})
export class SessionModule {}
