import { registerAs } from '@nestjs/config';

export const email = registerAs('email', () => ({
	sendgrid: {
		apiKey: process.env.SENDGRID_API_KEY
	}
}));
