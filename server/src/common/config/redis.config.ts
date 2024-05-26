import { registerAs } from '@nestjs/config';

export const redis = registerAs('redis', () => ({
	host: 'localhost',
	port: 6357
}));
