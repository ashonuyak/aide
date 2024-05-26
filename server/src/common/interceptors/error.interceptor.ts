import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NestInterceptor
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { isConnectionAborted, routeToErrorMessage } from 'src/utils/misc';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
	private readonly logger = new Logger(ErrorInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		return next.handle().pipe(
			catchError((error) =>
				throwError(() => {
					if (error instanceof HttpException === false) {
						const errorMessage = routeToErrorMessage(context.getHandler().name);

						if (!isConnectionAborted(error)) {
							this.logger.error(errorMessage, error, error?.errors, error?.stack);
						}

						return new InternalServerErrorException(errorMessage);
					} else {
						return error;
					}
				})
			)
		);
	}
}
