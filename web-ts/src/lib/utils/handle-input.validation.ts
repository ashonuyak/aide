type ValidateFunction = ((value: string | number) => [boolean, string]) | undefined;

export function handleInputValidation(value: number | string, validate: ValidateFunction) {
	if (!validate) return '';

	const [isValid, message] = validate(value);

	return isValid ? '' : message || 'Invalid input';
}
