import { writable } from 'svelte/store';
import type { ActiveId } from './types';

export const activeDropdownId = writable<ActiveId>(null);
