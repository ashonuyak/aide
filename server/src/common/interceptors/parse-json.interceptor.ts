import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ParseJsonInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();

		if (request.files && request.files['body']) {
			const file: Express.Multer.File = request.files['body'][0];
			const jsonStr = file.buffer.toString('utf-8');
			request.body = JSON.parse(jsonStr);
		}

		return next.handle().pipe(
			switchMap((data) => {
				return Promise.resolve(data);
			})
		);
	}
}
