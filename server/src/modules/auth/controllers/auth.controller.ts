import { Body, Controller, Delete, Logger, Post, Res } from '@nestjs/common';
import { GetLoginDetails } from 'src/common/decorators/login-details.decorator';
import { respondWithCookie } from 'src/utils/response';

import { Response } from 'express';
import { Session } from 'src/common/interfaces/session.interface';
import { AuthSession } from 'src/common/decorators/session.decorator';
import { AideCookie } from 'src/common/enums/aide-cookie.enum';
import { LoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthType } from '../enums/auth-type.enum';
import { LoginDetails } from '../interfaces/login-details.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { AuthService } from '../services/auth.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';

@Controller('auth')
export class AuthController {
	logger = new Logger(AuthController.name);

	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(
		@Body() loginCredential: LoginDto,
		@Res({ passthrough: true }) res: Response,
		@GetLoginDetails() loginDetails: LoginDetails
	): Promise<LoginResponse> {
		const body = await this.authService.login(loginCredential, loginDetails);

		return respondWithCookie(res, body, {
			isSecure: loginDetails.isSecure,
			values: [
				{ key: AideCookie.ACCESS_TOKEN, value: body.accessToken },
				{ key: AideCookie.AUTH_TYPE, value: AuthType.PASSWORD },
				{ key: AideCookie.IS_AUTHENTICATED, value: 'true' }
			]
		});
	}

	@Post('sign-up')
	async signUp(@Body() dto: SignUpDto, @Res({ passthrough: true }) res: Response): Promise<void> {
		try {
			await this.authService.signUp(dto);
		} catch (err) {
			throw err;
		}
	}

	@Delete('logout')
	@Roles(Role.Fundraiser)
	async logout(@AuthSession() session: Session) {
		try {
			return await this.authService.logout(session);
		} catch (err) {
			throw err;
		}
	}
}
