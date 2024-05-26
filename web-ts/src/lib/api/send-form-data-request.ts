import { PUBLIC_SERVER_URL } from '$env/static/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface JsonData {
	[key: string]: any;
}

interface FilesDictionary {
	[key: string]: File | File[];
}

const append = (data) => (formData, key) => {
	if (data[key] === undefined) return formData;

	if (Array.isArray(data[key])) {
		data[key].forEach((item) => formData.append(key, item));

		return formData;
	}

	if (typeof data[key] === 'object') {
		formData.append(key, JSON.stringify(data[key]));

		return formData;
	}

	formData.append(key, data[key]);

	return formData;
};

export const formDataAlo = (data) =>
	Object.keys(data)
		.reduce(append(data), new FormData());

/**
 * Send a request with multipart/form-data encoding.
 *
 * @param {string} url - The endpoint URL.
 * @param {JsonData} json - The JSON data to send.
 * @param {FilesDictionary} files - An object mapping from the form field name to the file(s) to be uploaded.
 * @returns {Promise<any>} - The response from the server parsed as JSON.
 */
export async function sendFormDataRequest(
	url: string,
	method: string,
	json: JsonData,
	files: FilesDictionary
): Promise<any> {
	const formData = new FormData();

	Object.entries(files).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((file) => {
				formData.append(key, file);
			});
		} else {
			formData.append(key, value);
		}
	});

	formData.append(
		'body',
		new Blob([JSON.stringify(json)], {
			type: 'application/json'
		})
	);

	const response = await fetch(`${PUBLIC_SERVER_URL}${url}`, {
		method,
		body: formData,
		headers: {
			Accept: 'multipart/form-data'
		},
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
}
