import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema({
	timestamps: true,
	collection: 'session',
	autoCreate: true,
	autoIndex: true
})
export class SessionModel extends Document {
	@Prop({
		type: String,
		required: true
	})
	readonly token!: string;

	@Prop({
		type: ObjectId,
		required: true,
		ref: 'user'
	})
	readonly userId!: ObjectId;

	@Prop({
		type: String,
		required: false
	})
	readonly deviceType!: string;

	@Prop({
		type: String,
		required: false
	})
	readonly deviceOS!: string;
}

export type SessionDocument = SessionModel & {
	createdAt: Date;
	updatedAt: Date;
};

export const SessionSchema = SchemaFactory.createForClass(SessionModel).set('versionKey', false);
