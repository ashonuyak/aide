import { IsOptional, IsString } from "class-validator";

export class CategoryAddOns {
    @IsOptional()
    @IsString()
    readonly region?: string;
}