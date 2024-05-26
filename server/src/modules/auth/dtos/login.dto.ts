import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	@IsEmail({ require_tld: false })
	@Transform(({ value }) => value?.toLowerCase())
	@IsNotEmpty()
	readonly email!: string;

	@IsString()
	@IsNotEmpty()
	readonly password!: string;
}
