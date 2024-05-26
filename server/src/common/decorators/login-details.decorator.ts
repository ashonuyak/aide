import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { LoginDetails } from 'src/modules/auth/interfaces/login-details.interface';
import { UAParser } from 'ua-parser-js';

export const GetLoginDetails = createParamDecorator(
	(data, context: ExecutionContext): LoginDetails => {
		const request = context.switchToHttp().getRequest<Request>();
		const userAgent = UAParser(request.headers['user-agent']);

		return {
			clientIp: request.ip,
			isSecure: request.secure,
			deviceType:
				userAgent.browser.name ||
				userAgent.device.type ||
				(request.headers.devicemodel as string) ||
				'',
			deviceOS: userAgent.os.name || (request.headers.devicetype as string) || ''
		};
	}
);
