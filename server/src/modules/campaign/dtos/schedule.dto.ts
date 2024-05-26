import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class ScheduleDto {
	@IsDate()
	@Type(() => Date)
	readonly start!: Date;

	@IsDate()
	@Type(() => Date)
	readonly end!: Date;
}
