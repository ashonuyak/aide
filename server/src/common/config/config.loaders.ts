import { email } from './email.config';
import { googleCloudStorage } from './google-cloud-storage.config';
import { mongo } from './mongo.config';
import { redis } from './redis.config';

export const configLoaders = [mongo, googleCloudStorage, email, redis];
