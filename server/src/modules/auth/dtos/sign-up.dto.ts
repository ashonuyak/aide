import { IsNotEmpty, IsString } from 'class-validator';

import { LoginDto } from './login.dto';

export class SignUpDto extends LoginDto {
	@IsString()
	@IsNotEmpty()
	readonly username!: string;

	@IsString()
	@IsNotEmpty()
	readonly firstName!: string;

	@IsString()
	@IsNotEmpty()
	readonly lastName!: string;
}
