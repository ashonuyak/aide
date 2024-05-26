import { registerAs } from '@nestjs/config';

export const stripe = registerAs('stripe', () => ({
	secretKey: process.env.STRIPE_SECRET_KEY,
    clientId: process.env.STRIPE_CLIENT_ID,
}));
