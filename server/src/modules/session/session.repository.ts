import { Injectable } from '@nestjs/common';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { GenericRepository } from 'src/utils/generic-repository';

import { UserDocument } from '../user/user.schema';

import { SessionDocument, SessionModel } from './session.schema';

@Injectable()
export class SessionRepository extends GenericRepository<SessionDocument>(SessionModel) {
	findUserSession(
		filter: FilterQuery<SessionDocument>
	): Promise<(SessionDocument & { user: UserDocument })[]> {
		return this.model.aggregate([
			{
				$match: filter
			},
			{
				$lookup: {
					from: 'user',
					localField: 'userId',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$unwind: '$user'
			}
		]);
	}
}
