import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';

export class ParamObjectIdPipe implements PipeTransform {
	transform(value: any) {
		if (isValidObjectId(value)) {
			return new ObjectId(value);
		}

		throw new BadRequestException('Invalid id');
	}
}
