interface ValidateOptions {
	readonly length?: number;
	readonly minlength?: number;
	readonly maxlength?: number;
	readonly minSize?: number;
	readonly maxSize?: number;
	readonly required?: boolean;
	readonly email?: boolean;
	readonly password?: boolean;
	readonly message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validate(options: ValidateOptions, value: any): [boolean, string] {
	let isValid = true;
	let errorMessage = '';

	if (typeof value === 'string' || typeof value === 'number') {
		value = value.toString(); // Convert numbers to string for consistency in checks

		// Required field validation
		if (options.required && (!value || value.trim() === '')) {
			isValid = false;
			errorMessage = options.message || 'This field is required.';
		}

		// Length validation
		if (isValid && options.length !== undefined && value.length !== options.length) {
			isValid = false;
			errorMessage =
				options.message || `This field must be exactly ${options.length} characters long.`;
		}

		// Minlength validation
		if (isValid && options.minlength !== undefined && value.length < options.minlength) {
			isValid = false;
			errorMessage =
				options.message ||
				`This field must be at least ${options.minlength} characters long.`;
		}

		// Maxlength validation
		if (isValid && options.maxlength !== undefined && value.length > options.maxlength) {
			isValid = false;
			errorMessage =
				options.message ||
				`This field must be no more than ${options.maxlength} characters long.`;
		}

		// Email validation
		if (isValid && options.email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				isValid = false;
				errorMessage = options.message || 'Please enter a valid email address.';
			}
		}

		// Password validation (example could include checks for numbers, letters, special characters)
		if (isValid && options.password) {
			// const passwordRegex =
			// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			const passwordRegex = /^[A-Za-z\d]{8,}$/;

			if (!passwordRegex.test(value)) {
				isValid = false;
				errorMessage = options.message || 'Password must be stronger.';
			}
		}
	} else {
		// When value is not a string or number, or is missing when required
		if (options.required) {
			isValid = false;
			errorMessage = options.message || 'Invalid input type or missing value.';
		}
	}

	return [isValid, errorMessage];
}
