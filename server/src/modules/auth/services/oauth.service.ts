import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuthCallbackDto } from '../dtos/oauth-callback.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable()
export class OAuthService {
	private oauth2Client = new google.auth.OAuth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		'http://localhost:3001/api/oauth/callback'
	);

	constructor(private readonly authService: AuthService) {}

	getAuthUrl(): string {
		const scopes = [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		];

		return this.oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: scopes
		});
	}

	async getToken(code: string): Promise<string | null | undefined> {
		const { tokens } = await this.oauth2Client.getToken(code);
		this.oauth2Client.setCredentials(tokens);
		return tokens.access_token;
	}

	async getUserInfo(accessToken: string): Promise<OAuthCallbackDto> {
		this.oauth2Client.setCredentials({ access_token: accessToken });
		const oauth2 = google.oauth2({
			auth: this.oauth2Client,
			version: 'v2'
		});

		const userInfo = await oauth2.userinfo.get();
		return userInfo.data as OAuthCallbackDto;
	}

	async handleOAuth(userInfo: OAuthCallbackDto): Promise<LoginResponse> {
		return this.authService.handleOAuth(userInfo);
	}
}
