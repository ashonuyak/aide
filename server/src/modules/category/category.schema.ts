import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
	timestamps: true,
	collection: 'category',
	autoCreate: true,
	autoIndex: true
})
export class CategoryModel extends Document {
	declare _id: string;

	@Prop({
		type: String,
		required: true
	})
	readonly title!: string;

	@Prop({
		type: String,
		required: true
	})
	readonly subtitle!: string;

	@Prop({
		type: String,
		required: true
	})
	readonly handle!: string;

	// @Prop({
	// 	type: String,
	// 	required: false
	// })
	// readonly description?: string;

	// @Prop({
	// 	type: String,
	// 	required: true
	// })
	// readonly mediaUrl!: string;

	@Prop({
		type: Number,
		required: true
	})
	readonly order!: number;

	@Prop({
		type: String,
		required: true
	})
	readonly color!: string;
}

export type CategoryDocument = CategoryModel;

export const CategorySchema = SchemaFactory.createForClass(CategoryModel).set('versionKey', false);
