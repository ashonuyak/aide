import { Body, Controller, Get, Logger, Post, Put, Query } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ParamObjectIdPipe } from 'src/common/pipes/param-object-id.pipe';

import { Role } from '../auth/enums/roles.enum';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { GetCategoryDto } from './dtos/get-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('category')
export class CategoryController {
	logger = new Logger(CategoryController.name);

	constructor(private readonly categoryService: CategoryService) {}

	@Get('/all')
	getAllCategories(): Promise<GetCategoryDto[]> {
		return this.categoryService.find({}, null, { order: 1 });
	}

	@Get()
	async getCategoryById(@Query('id', ParamObjectIdPipe) _id: ObjectId): Promise<GetCategoryDto> {
		const [category] = await this.categoryService.find({ _id });

		return category;
	}

	@Post()
	@Roles(Role.Admin)
	createCategory(@Body() payload: CreateCategoryDto): Promise<GetCategoryDto> {
		return this.categoryService.create(payload);
	}

	@Put()
	@Roles(Role.Admin)
	updateCategory(@Body() payload: UpdateCategoryDto) {
		return this.categoryService.update(payload);
	}

	@Get('/admin/all')
	@Roles(Role.Admin)
	getAdminCategories(): Promise<GetCategoryDto[]> {
		return this.categoryService.findCategoriesForAdmin();
	}
}
