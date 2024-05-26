import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { ClsModule, CLS_ID } from 'nestjs-cls';
import { join } from 'path';

import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configLoaders } from './common/config/config.loaders';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 100
			}
		]),
		ConfigModule.forRoot({
			envFilePath: join(__dirname, '../', '.env'),
			isGlobal: true,
			cache: true,
			load: configLoaders
		}),
		ClsModule.forRoot({
			middleware: {
				mount: true,
				generateId: true,
				setup: (cls, request: Request, res: Response) => {
					const headerValues = request.headers['x-aide-cid'];
					const headerValue = Array.isArray(headerValues)
						? headerValues[0]
						: headerValues;
					const cid = headerValue || cls.get(CLS_ID);

					cls.set(CLS_ID, cid);
					res.header('x-aide-cid', cid);
				}
			}
		}),
		MongooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get('mongo.url')
			}),
			inject: [ConfigService]
		}),
		MulterModule.register({
			dest: './uploads'
		}),
		AuthModule,
		CampaignModule,
		CategoryModule,
		UserModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_GUARD, useClass: AuthGuard },
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	]
})
export class ApiModule {}
