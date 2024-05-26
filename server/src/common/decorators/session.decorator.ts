import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Session } from '../interfaces/session.interface';

export const AuthSession = createParamDecorator((_data, context: ExecutionContext): Session => {
	return context.switchToHttp().getRequest<{ session: Session }>().session;
});
