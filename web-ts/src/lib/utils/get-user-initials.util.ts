export function getUserInitials(name: string = 'U') {
	return name
		.split(' ')
		.map((word: string) => word[0])
		.join('')
		.toUpperCase();
}
