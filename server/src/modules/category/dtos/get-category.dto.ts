export class GetCategoryDto {
	readonly _id!: string;

	readonly title!: string;

	readonly subtitle!: string;

	readonly order!: number;

	readonly handle!: string;

	readonly color!: string;

	readonly mediaUrl?: string;
}
