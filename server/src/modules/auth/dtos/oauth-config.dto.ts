import { IsNotEmpty, IsString } from 'class-validator';

export class OAuthConfigDto {
	@IsNotEmpty()
	@IsString()
	readonly redirectUri!: string;
}
