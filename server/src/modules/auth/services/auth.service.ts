import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
	UnauthorizedException
} from '@nestjs/common';
import cookieParser from 'cookie';
import dayjs from 'dayjs';
import { IncomingHttpHeaders } from 'node:http';
import { AideCookie } from 'src/common/enums/aide-cookie.enum';
import { Session } from 'src/common/interfaces/session.interface';

import { CryptoService } from '../../crypto/crypto.service';
import { SessionService } from '../../session/session.service';
import { UserDocument } from '../../user/user.schema';
import { UserService } from '../../user/user.service';

import { Redis } from 'ioredis';
import { EmailService } from 'src/modules/email/email.service';
import { LoginDto } from '../dtos/login.dto';
import { OAuthCallbackDto } from '../dtos/oauth-callback.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthType } from '../enums/auth-type.enum';
import { Role } from '../enums/roles.enum';
import { LoginDetails } from '../interfaces/login-details.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { LogoutResponse } from '../interfaces/logout-response.interface';

@Injectable()
export class AuthService {
	logger = new Logger(AuthService.name);

	constructor(
		private readonly userService: UserService,
		private readonly cryptoService: CryptoService,
		private readonly sessionService: SessionService,
		@Inject('REDIS') private readonly redis: Redis,
		private readonly emailService: EmailService
	) {}

	async login(credentials: LoginDto, details: LoginDetails): Promise<LoginResponse> {
		let user = await this.userService.findOne({ email: credentials.email });

		if (user) {
			const isAuthenticated = this.validatePassword(credentials.password, user);

			if (!isAuthenticated) {
				user = null;
			}
		}

		if (!user) {
			this.logger.warn(
				`Failed login attempt for user ${credentials.email} from ip address ${details.clientIp}`
			);
			throw new UnauthorizedException('Incorrect email or password');
		}

		return this.createLoginResponse(user, details);
	}

	async handleOAuth(userInfo: OAuthCallbackDto) {
		let user = await this.userService.findOne({ oauthId: userInfo.id });

		if (!user) {
			const username =
				userInfo.name ?? `${userInfo.given_name || ''} ${userInfo.family_name || ''}`;
			const data = {
				username,
				email: userInfo.email,
				lastName: userInfo.family_name,
				firstName: userInfo.given_name,
				avatarUrl: userInfo.picture,
				oauthId: userInfo.id,
				initials: this.formatInitials(username)
			};

			user = await this.userService.create({
				...data,
				password: '',
				role: Role.User
			});
		}

		return this.createLoginResponse(user, { deviceOS: '', deviceType: '', isSecure: true });
	}

	async logout(session: Session, authType: AuthType): Promise<LogoutResponse> {
		if (session) {
			await this.sessionService.deleteOne(session._id);
		}

		return {
			successful: true,
			// redirectUri: await this.getLogoutEndpoint(authType)
			redirectUri: '/'
		};
	}

	// private async getLogoutEndpoint(authType: AuthType): Promise<string> {
	// 	if (authType !== AuthType.OAUTH) {
	// 		return LOGIN_URL;
	// 	}

	// 	const client = await this.getOAuthClient(config);
	// 	return client.issuer.metadata.end_session_endpoint || LOGIN_URL;
	// }

	private async createLoginResponse(user: UserDocument, loginDetails: LoginDetails) {
		const key = this.cryptoService.newPassword(32);
		const token = this.cryptoService.hashSha256(key);

		await this.sessionService.create({
			token,
			userId: user._id,
			deviceOS: loginDetails.deviceOS,
			deviceType: loginDetails.deviceType
		});

		return this.mapLoginResponse(user, key);
	}

	async validate(headers: IncomingHttpHeaders): Promise<Session> {
		const session = this.getCookieToken(headers) as string;

		console.log('session :>> ', session);

		if (session) {
			return this.validateSession(session);
		}

		throw new UnauthorizedException('Authentication required');
	}

	private async validateSession(token: string): Promise<Session> {
		const [session] = await this.sessionService.findOne({
			token: this.cryptoService.hashSha256(token)
		});

		if (session?.user) {
			const now = dayjs();
			const updatedAt = dayjs(session.updatedAt);
			const diff = now.diff(updatedAt, 'hour');

			if (diff > 1) {
				await this.sessionService.updateOne(
					{ _id: session._id },
					{ updatedAt: new Date() }
				);
			}

			return session;
		}

		throw new UnauthorizedException('Invalid user token');
	}

	private validatePassword(password: string, user: UserDocument): boolean {
		if (!user || !user.password) {
			return false;
		}

		return this.cryptoService.comparePassword(password, user.password);
	}

	private getCookieToken(headers: IncomingHttpHeaders): string | null {
		const cookies = cookieParser.parse(headers.cookie || '');

		console.log('cookies :>> ', cookies);

		return cookies[AideCookie.ACCESS_TOKEN] || null;
	}

	private mapLoginResponse(entity: UserDocument, accessToken: string): LoginResponse {
		return {
			accessToken,
			userId: entity.id,
			email: entity.email,
			username: entity.username,
			role: entity.role,
			avatarUrl: entity.avatarUrl
		};
	}

	async signUp(data: SignUpDto): Promise<UserDocument> {
		try {
			const user = await this.userService.create({
				...data,
				initials: this.formatInitials(`${data.firstName} ${data.lastName}`),
				password: this.cryptoService.hashPassword(data.password),
				role: Role.User,
				verified: false
			});

			const verificationCode = this.generateVerificationCode();

			await Promise.all([
				this.redis.set(`email_verification_${user._id}`, verificationCode, 'EX', 10 * 60),
				this.emailService.sendVerificationEmail(user.email, verificationCode)
			]);

			return user;
		} catch {
			throw new BadRequestException('User exists!');
		}
	}

	private generateVerificationCode(): number {
		return Math.floor(1000 + Math.random() * 9000);
	}

	private formatInitials(name: string): string {
		return name
			.split(' ')
			.map((word: string) => word[0])
			.join('')
			.toUpperCase();
	}
}
