import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';

import { UserDocument } from '../user/user.schema';

import { SessionRepository } from './session.repository';
import { SessionDocument } from './session.schema';

@Injectable()
export class SessionService {
	logger = new Logger(SessionService.name);

	constructor(private readonly sessionRepository: SessionRepository) {}

	findOne(
		filter: FilterQuery<SessionDocument>
	): Promise<(SessionDocument & { user: UserDocument })[]> {
		return this.sessionRepository.findUserSession(filter);
	}

	create(entity: any): Promise<SessionDocument> {
		return this.sessionRepository.create(entity);
	}

	updateOne(filter: FilterQuery<SessionDocument>, updateQuery: UpdateQuery<SessionDocument>) {
		return this.sessionRepository.updateOne(filter, updateQuery);
	}

	deleteOne(filter: FilterQuery<SessionDocument>) {
		return this.sessionRepository.deleteOne(filter).lean();
	}

	deleteMany(filter: FilterQuery<SessionDocument>) {
		return this.sessionRepository.deleteMany(filter);
	}
}
