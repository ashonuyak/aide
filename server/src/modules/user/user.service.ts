import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';

import { MongoSort } from 'src/common/types/mongo-sort.type';
import { UserRepository } from './user.repository';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
	logger = new Logger(UserService.name);

	constructor(private readonly userRepository: UserRepository) {}

	findOne(
		filter: FilterQuery<UserDocument>,
		projection?: ProjectionType<UserDocument> | null,
		options?: QueryOptions<UserDocument>
	): Promise<UserDocument | null> {
		return this.userRepository.findOne(filter, projection, options);
	}

	create(entity: any): Promise<UserDocument> {
		return this.userRepository.create(entity);
	}

	find(
		filter: FilterQuery<UserDocument>,
		projection?: ProjectionType<UserDocument> | null,
		sort?: MongoSort
	) {
		return this.userRepository.find(filter, projection, sort);
	}

	updateOne(filter: FilterQuery<UserDocument>, updateQuery: UpdateQuery<UserDocument>) {
		return this.userRepository.updateOne(filter, updateQuery);
	}
}
