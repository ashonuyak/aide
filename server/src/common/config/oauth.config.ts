import { registerAs } from '@nestjs/config';

export const oauth = registerAs('oauth', () => ({
	clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: 'http://localhost:3001/api/oauth/callback'
}));
