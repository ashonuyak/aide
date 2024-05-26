import { Module } from '@nestjs/common';

import { CryptoModule } from '../crypto/crypto.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../user/user.module';

import { AuthController } from './controllers/auth.controller';
import { OauthController } from './controllers/oauth.controller';
import { AuthService } from './services/auth.service';
import { OAuthService } from './services/oauth.service';
import { RedisModule } from '../redis/redis.module';
import { EmailModule } from '../email/email.module';

@Module({
	imports: [UserModule, CryptoModule, SessionModule, RedisModule, EmailModule],
	providers: [AuthService, OAuthService],
	controllers: [AuthController, OauthController],
	exports: [AuthService]
})
export class AuthModule {}
