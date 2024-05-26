import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Role } from '../auth/enums/roles.enum';

@Schema({
	timestamps: true,
	collection: 'user',
	autoCreate: true,
	autoIndex: true
})
export class UserModel extends Document {
	@Prop({
		type: String,
		required: true
	})
	readonly username!: string;

	@Prop({
		type: String,
		required: true,
		unique: true,
		index: true
	})
	readonly email!: string;

	@Prop({
		type: String,
		default: null
	})
	readonly password?: string | null;

	@Prop({
		type: String,
		required: false
	})
	readonly lastName?: string;

	@Prop({
		type: String,
		required: false
	})
	readonly firstName?: string;

	@Prop({
		type: String,
		required: true,
		enum: Role
	})
	readonly role!: Role;

	@Prop({
		type: String,
		required: false
	})
	readonly avatarUrl?: string;

	@Prop({
		type: String,
		required: false
	})
	readonly oauthId?: string;

	@Prop({
		type: String,
		required: true
	})
	readonly initials!: string;

	@Prop({
		type: Boolean,
		required: false,
		default: false
	})
	readonly blocked?: boolean = false;

	@Prop({
		type: Boolean,
		required: false,
		default: false
	})
	readonly verified?: boolean = false;

	// fundraiserId, adminId
}

export type UserDocument = UserModel & {
	createdAt: Date;
	updatedAt: Date;
};;

export const UserSchema = SchemaFactory.createForClass(UserModel).set('versionKey', false);
