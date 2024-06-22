const options = { year: 'numeric', month: 'long', day: 'numeric' };

export const formatDate = (date: string) =>
	new Intl.DateTimeFormat('en-US', options as Intl.DateTimeFormatOptions).format(new Date(date));
