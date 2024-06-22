import {
    ArgumentMetadata, BadRequestException, Injectable, PipeTransform,
} from '@nestjs/common';

type TOptional<T> = T | undefined;

@Injectable()
export class ValidateEnum<T extends Record<string, unknown>> implements PipeTransform<T> {
    constructor(
        public readonly enumObject: T,
        public readonly required = false,
    ) {}

    async transform(value: TOptional<T>, { data: argName }: ArgumentMetadata): Promise<TOptional<T>> {
        const withValidation = this.required || value !== undefined;

        if (withValidation) {
            const enumValues = Object.values(this.enumObject);

            if (!enumValues.includes(value)) {
                throw new BadRequestException(`${argName} must be one of the following values: ${enumValues.join(', ')}`);
            }
        }

        return value;
    }
}
