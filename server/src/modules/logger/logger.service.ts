import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { isLogLevelEnabled } from '@nestjs/common/services/utils/is-log-level-enabled.util';
import { ClsService } from 'nestjs-cls';

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

export class LoggerService extends ConsoleLogger {
	private static logLevels: LogLevel[] = [
		AideLogLevel.LOG,
		AideLogLevel.WARN,
		AideLogLevel.ERROR
	];

	constructor(private cls: ClsService) {
		super(LoggerService.name);
	}

	isLevelEnabled(level: LogLevel) {
		return isLogLevelEnabled(level, LoggerService.logLevels);
	}

	protected formatContext(context: string): string {
		let formattedContext = super.formatContext(context);

		const correlationId = this.cls?.getId();

		if (correlationId && this.isLevelEnabled(AideLogLevel.VERBOSE)) {
			formattedContext += `[${correlationId}] `;
		}

		return formattedContext;
	}
}
