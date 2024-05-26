import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/utils/generic-repository';

import { CategoryDocument, CategoryModel } from './category.schema';

@Injectable()
export class CategoryRepository extends GenericRepository<CategoryDocument>(CategoryModel) {}
