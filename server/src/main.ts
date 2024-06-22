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

import { SpelunkerModule } from 'nestjs-spelunker';

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

	const tree = SpelunkerModule.explore(app);
	const root = SpelunkerModule.graph(tree);
	const edges = SpelunkerModule.findGraphEdges(root);
	const mermaidEdges = edges
	  .filter( // I'm just filtering some extra Modules out
		({ from, to }) =>
		  !(
			from.module.name === 'ConfigHostModule' ||
			to.module.name === 'ConfigHostModule' ||
			from.module.name === 'LoggerModule' ||
			to.module.name === 'LoggerModule' ||
			from.module.name === 'ThrottlerModule' ||
			to.module.name === 'ThrottlerModule' ||
			from.module.name === 'ClsModule' ||
			to.module.name === 'ClsModule' ||
			from.module.name === 'MongooseCoreModule' ||
			to.module.name === 'MongooseCoreModule' ||
			from.module.name === 'ConfigModule' ||
			to.module.name === 'ConfigModule'
		  ),
	  )
	  .map(({ from, to }) => `${from.module.name}-->${to.module.name}`);
	console.log(`graph TD\n\t${mermaidEdges.join('\n\t')}`);
}

// %%{
// 	init: {
// 	  'theme': 'light',
// 	  'themeVariables': {
// 		'primaryColor': '#fff',
// 		'primaryTextColor': '#222',
// 		'primaryBorderColor': '#222',
// 		'lineColor': '#222',
// 		'secondaryColor': '#fff',
// 		'tertiaryColor': '#222',
// 		'mainBkg': '#fff',
// 	  'secondaryBorderColor': '#222',
// 	  'background': '#fff',
// 	  'tertiaryBorderColor': '#222',
// 	  'noteBorderColor': '#222'
// 	  }
// 	}
//   }%%
  
//   graph TD
// 		  ApiModule-->MongooseModule
// 		  MongooseModule-->RedisModule
// 		  ApiModule-->MulterModule
// 		  MulterModule-->RedisModule
// 		  ApiModule-->AuthModule
// 		  AuthModule-->UserModule
// 		  UserModule-->MongooseModule
// 		  UserModule-->RedisModule
// 		  AuthModule-->CryptoModule
// 		  CryptoModule-->RedisModule
// 		  AuthModule-->SessionModule
// 		  SessionModule-->MongooseModule
// 		  SessionModule-->RedisModule
// 		  AuthModule-->RedisModule
// 		  AuthModule-->EmailModule
// 		  EmailModule-->RedisModule
// 		  ApiModule-->CampaignModule
// 		  CampaignModule-->MongooseModule
// 		  CampaignModule-->MediaModule
// 		  MediaModule-->StorageModule
// 		  StorageModule-->RedisModule
// 		  MediaModule-->RedisModule
// 		  CampaignModule-->CategoryModule
// 		  CategoryModule-->MongooseModule
// 		  CategoryModule-->RedisModule
// 		  CampaignModule-->RedisModule
// 		  ApiModule-->CategoryModule
// 		  ApiModule-->UserModule
// 		  ApiModule-->RedisModule

bootstrap();
