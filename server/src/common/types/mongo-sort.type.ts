import { SortOrder } from 'mongoose';

export type MongoSort =
	| string
	| { [key: string]: SortOrder | { $meta: any } }
	| [string, SortOrder][]
	| undefined
	| null;
