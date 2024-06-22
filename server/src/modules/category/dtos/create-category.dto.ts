import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	@MaxLength(100)
	readonly title!: string;

	@IsString()
	@MaxLength(200)
	readonly subtitle!: string;

	@IsString()
	@MaxLength(200)
	readonly handle!: string;

	@IsString()
	@MaxLength(50)
	readonly color!: string;

	@IsString()
	@IsOptional()
	readonly mediaUrl?: string;
}
