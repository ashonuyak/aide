import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryModel, CategorySchema } from './category.schema';
import { CategoryService } from './category.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: CategoryModel.name,
				schema: CategorySchema
			}
		])
	],
	providers: [CategoryRepository, CategoryService],
	controllers: [CategoryController],
	exports: [CategoryService]
})
export class CategoryModule {}
