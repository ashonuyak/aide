import { registerAs } from '@nestjs/config';

interface EnvironmentConfig {
	readonly mongoRSConfig: string;
	readonly mongoDbName: string;
	readonly ipsStrings: string;
}

interface Configurations {
	readonly development: EnvironmentConfig;
	readonly staging: EnvironmentConfig;
}

const mongoConfigurations: Configurations = {
	development: {
		mongoRSConfig: '?replicaSet=rs0',
		mongoDbName: 'aide',
		ipsStrings: 'localhost:30011,localhost:30012,localhost:30013'
	},
	staging: {
		mongoRSConfig: '',
		mongoDbName: 'aide',
		ipsStrings: 'mongo-6-dev:27017,mongo-6-dev-slave-1:27017,mongo-6-dev-slave-2:27017'
	}
};

const environment = (process.env.NODE_ENV as keyof Configurations) || 'development';
const configuration = mongoConfigurations[environment];

const getMongoUrl = (config: any): string => {
	const mongoRS = `mongodb://${config.ipsStrings}/`;

	return mongoRS + config.mongoDbName + config.mongoRSConfig;
};

export const mongo = registerAs('mongo', () => ({
	url: getMongoUrl(configuration)
}));
