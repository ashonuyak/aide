import type { Writable } from 'svelte/store';

export type ActiveId = string | null;
export type ActiveIdContext = Writable<ActiveId>;
