import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

export const mongoLogger = (context?: string) => (connection: any) => {
	connection.on('connecting', () => {
		Logger.log('Connecting', context);
	});

	connection.on('error', (error: any) => {
		Logger.log(`Connection ${error}`, context);
		mongoose.disconnect();
	});

	connection.on('connected', () => {
		Logger.log('Connected', context);
	});

	connection.once('open', () => {
		Logger.log('Connection opened', context);
	});

	connection.on('reconnected', () => {
		Logger.log('Reconnected', context);
	});

	connection.on('reconnectFailed', () => {
		Logger.log('ReconnectFailed', context);
	});

	connection.on('disconnected', () => {
		Logger.log('Disconnected', context);
	});

	connection.on('fullsetup', () => {
		Logger.log('Reconnecting... %d', context);
	});

	return connection;
};
