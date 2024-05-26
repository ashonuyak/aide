import { Transform, TransformFnParams } from 'class-transformer';
import { ObjectId } from 'mongodb';

export const toObjectId = ({ value }: TransformFnParams) => new ObjectId(value);

export const ToObjectId = () => Transform(toObjectId);
