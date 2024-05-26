import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/auth/enums/roles.enum';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	logger = new Logger(AuthGuard.name);

	constructor(private reflector: Reflector, private authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get<Role[]>('roles', context.getHandler());

		console.log('roles :>> ', roles);

		if (!roles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const session = await this.authService.validate(request.headers);

		console.log('session :>> ', session);

		request.session = session;

		return roles.includes(session.user.role);
	}
}
