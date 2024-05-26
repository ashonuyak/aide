import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
	providers: [
		{
			provide: 'REDIS',
			useFactory: () => {
				const redis = new Redis({
					host: process.env.REDIS_HOST || 'localhost',
					port: 6379
				});
				return redis;
			}
		}
	],
	exports: ['REDIS']
})
export class RedisModule {}
