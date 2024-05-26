import type { Status } from '@aide/sdk';
import { writable } from 'svelte/store';

function createCampaignsStore() {
	const campaigns = writable<any[]>();
	const status = writable<Status | undefined>();
	const search = writable<string | undefined>();

	return {
		campaigns,
		status,
		search
	};
}

export const campaignsStore = createCampaignsStore();
