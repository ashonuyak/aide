import { writable } from 'svelte/store';

function createWizardStore() {
	const isEditMode = writable<boolean>(false);

	return {
		isEditMode
	};
}

export const wizardStore = createWizardStore();
