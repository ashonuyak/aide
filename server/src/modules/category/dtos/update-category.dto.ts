import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { ToObjectId } from 'src/common/transforms/to-object-id.transform';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
	@IsDefined()
	@IsNotEmpty()
	@ToObjectId()
	readonly _id!: string;
}
