import { writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';
import type { ActiveId, ActiveIdContext } from './types';

export function setDropdownOptions() {
	const activeComponentId = writable<ActiveId>(null);
	setContext<ActiveIdContext>('active', activeComponentId);
}

export function getDropdownOptions() {
	const activeComponentId = getContext<ActiveIdContext>('active');
	return { activeComponentId };
}
