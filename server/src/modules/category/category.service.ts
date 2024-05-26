import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, ProjectionType } from 'mongoose';
import { MongoSort } from 'src/common/types/mongo-sort.type';

import { CategoryRepository } from './category.repository';
import { CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
	logger = new Logger(CategoryService.name);

	constructor(private readonly categoryRepository: CategoryRepository) {}

	find(
		filter: FilterQuery<CategoryDocument>,
		projection?: ProjectionType<CategoryDocument> | null,
		sort?: MongoSort
	): Promise<CategoryDocument[]> {
		return this.categoryRepository.find(filter, projection, sort);
	}

	findOne(filter: FilterQuery<CategoryDocument>): Promise<CategoryDocument | null> {
		return this.categoryRepository.findOne(filter);
	}

	async create(data: CreateCategoryDto): Promise<CategoryDocument> {
		const count = await this.categoryRepository.countDocuments();

		return this.categoryRepository.create({
			...data,
			order: count
		});
	}

	update({ _id, ...data }: UpdateCategoryDto) {
		return this.categoryRepository.updateMany({ _id }, data);
	}
}
