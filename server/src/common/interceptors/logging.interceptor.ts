import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		const handler = context.switchToHttp();
		const request = handler.getRequest();
		const res = handler.getResponse();

		const { method, ip, path } = request;

		const start = performance.now();

		return next.handle().pipe(
			finalize(() => {
				const finish = performance.now();
				const duration = (finish - start).toFixed(2);
				const { statusCode } = res;

				this.logger.verbose(`${method} ${path} ${statusCode} ${duration}ms ${ip}`);
			})
		);
	}
}
