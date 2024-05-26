export function isValidURL(url: string): boolean {
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
			'(\\:\\d+)?' + // port
			'(\\/[-a-z\\d%_.~+]*)*' + // path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i' // fragment locator
	);
	return !!pattern.test(url);
}
