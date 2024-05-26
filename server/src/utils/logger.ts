import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { isLogLevelEnabled } from '@nestjs/common/services/utils/is-log-level-enabled.util';

export enum AideLogLevel {
	VERBOSE = 'verbose',
	DEBUG = 'debug',
	LOG = 'log',
	WARN = 'warn',
	ERROR = 'error'
}

const LOG_LEVELS = [
	AideLogLevel.VERBOSE,
	AideLogLevel.DEBUG,
	AideLogLevel.LOG,
	AideLogLevel.WARN,
	AideLogLevel.ERROR
];

export class AideLogger extends ConsoleLogger {
	private static logLevels: LogLevel[] = [
		AideLogLevel.LOG,
		AideLogLevel.WARN,
		AideLogLevel.ERROR
	];

	constructor(context: string) {
		super(context);
	}

	isLevelEnabled(level: LogLevel) {
		return isLogLevelEnabled(level, AideLogger.logLevels);
	}

	static setLogLevel(level: AideLogLevel | false): void {
		AideLogger.logLevels = level === false ? [] : LOG_LEVELS.slice(LOG_LEVELS.indexOf(level));
	}
}
