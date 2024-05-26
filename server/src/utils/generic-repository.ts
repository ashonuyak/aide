import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { MongoSort } from 'src/common/types/mongo-sort.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GenericRepository<T extends Document>(model: any) {
	@Injectable()
	class Repository {
		constructor(@InjectModel(model.name) readonly model: Model<T>) {}

		findOne(
			filter: FilterQuery<T>,
			projection?: ProjectionType<T> | null,
			options?: QueryOptions<T>
		): Promise<T | null> {
			return this.model.findOne(filter, projection, options).lean();
		}

		find(
			filter: FilterQuery<T>,
			projection?: ProjectionType<T> | null,
			sort?: MongoSort
		): Promise<T[]> {
			return this.model.find(filter, projection).sort(sort).lean();
		}

		create(entity: any): Promise<T> {
			return this.model.create(entity);
		}

		updateOne(filter: FilterQuery<T>, updateQuery: UpdateQuery<T>) {
			return this.model.updateOne(filter, updateQuery).lean();
		}

		updateMany(filter: FilterQuery<T>, updateQuery: UpdateQuery<T>) {
			return this.model.updateMany(filter, updateQuery).lean();
		}

		deleteOne(filter: FilterQuery<T>) {
			return this.model.deleteOne(filter).lean();
		}

		deleteMany(filter: FilterQuery<T>) {
			return this.model.deleteMany(filter).lean();
		}

		aggregate<U>(query: any[]): Promise<U[]> {
			return this.model.aggregate(query).exec();
		}

		countDocuments(filter?: FilterQuery<T>): Promise<number> {
			return this.model.countDocuments(filter).exec();
		}
	}

	return Repository;
}
