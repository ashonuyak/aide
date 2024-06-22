import { page } from '$app/stores';
import { type GetCategoryDto } from '@aide/sdk';
import { readable } from 'svelte/store';

export const categories = readable<GetCategoryDto[]>([], function start(set) {
	page.subscribe((value) => {
		console.log('value :>> ', value);
		set(value.data.categories);
	});

	return function stop() {};
});
