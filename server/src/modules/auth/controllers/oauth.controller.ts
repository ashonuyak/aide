import { Controller, Get, Logger, Query, Redirect, Res } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';
import { AideCookie } from 'src/common/enums/aide-cookie.enum';
import { respondWithCookie } from 'src/utils/response';
import { AuthType } from '../enums/auth-type.enum';
import { OAuthService } from '../services/oauth.service';
import { Role } from '../enums/roles.enum';

class GetAuthResponseDto {
	@ApiProperty({ type: String })
	readonly url!: string;
}

@Controller('oauth')
export class OauthController {
	logger = new Logger(OauthController.name);

	constructor(private readonly oauthService: OAuthService) {}

	@Get()
	getAuth(): GetAuthResponseDto {
		const url = this.oauthService.getAuthUrl();

		console.log('url :>> ', url);

		return { url };
	}

	@Get('callback')
	async getToken(@Query('code') code: string, @Res() res: Response) {
		try {
			const accessToken = await this.oauthService.getToken(code);
			if (!accessToken) {
				throw new Error('Failed to retrieve access token');
			}

			const userInfo = await this.oauthService.getUserInfo(accessToken);
			const user = await this.oauthService.handleOAuth(userInfo);
			respondWithCookie(res, user, {
				isSecure: true,
				values: [
					{ key: AideCookie.ACCESS_TOKEN, value: user.accessToken },
					{ key: AideCookie.AUTH_TYPE, value: AuthType.OAUTH },
					{ key: AideCookie.IS_AUTHENTICATED, value: 'true' }
				]
			});

			console.log('user :>> ', user);

			if (user.role === Role.Admin) {
				res.redirect('http://localhost:5173/admin/campaigns');
			} else {
				res.redirect('http://localhost:5173/fundraiser/campaigns');
			}

		} catch (error) {
			console.error('Error handling OAuth callback:', error);
			res.status(500).send('Authentication failed.');
		}
	}
}
