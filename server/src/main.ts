import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import sirv from 'sirv';
import compression from 'compression';

import { ApiModule } from './app.module';
import { HOST, IS_DEV, SERVER_PORT, WEB_ROOT } from './constants';
import { useSwagger } from './utils/misc';

async function bootstrap() {
	// otelSDK.start();

	const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
		bufferLogs: true,
		rawBody: true,
		bodyParser: true
	});
	app.use(helmet());
	app.use(compression());
	app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
	app.set('etag', 'strong');
	app.use(cookieParser());
	app.use(json({ limit: '10mb' }));

	console.log('IS_DEV :>> ', IS_DEV);

	if (IS_DEV) {
		app.enableCors({
			origin: 'http://localhost:5173',
			credentials: true
		});
	}

	useSwagger(app, IS_DEV);

	app.setGlobalPrefix('api', { exclude: [] });

	app.useGlobalPipes(
		new ValidationPipe({
			validateCustomDecorators: true,
			transform: true
		})
	);

	const server = await (HOST ? app.listen(SERVER_PORT, HOST) : app.listen(SERVER_PORT));

	server.requestTimeout = 30 * 60 * 1000;

	console.log(`Aide Server is listening on ${await app.getUrl()} `);
}

bootstrap();
