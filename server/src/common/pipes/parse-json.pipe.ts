import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseJSONPipe implements PipeTransform {
	transform(value: any) {
		try {
            return JSON.parse(value);
        } catch {
            throw new BadRequestException()
        }
	}
}
