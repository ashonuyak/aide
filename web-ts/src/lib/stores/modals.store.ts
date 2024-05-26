import { writable } from 'svelte/store';

function createModalsStore() {
	let _history: Array<string> = [];
	const _options: Map<string, any> = new Map();

	const history = writable<Array<string>>([]);
	const options = writable<Map<string, any>>(new Map());

	const showModal = (modalId: string, modalOptions: unknown = {}) => {
		_history = [..._history, modalId];
		_options.set(modalId, modalOptions);

		history.set(_history);
		options.set(_options);
	};

	const hideModal = (modalId: string) => {
		_history = [..._history.filter((id) => id !== modalId)];
		_options.delete(modalId);

		history.set(_history);
		options.set(_options);
	};

	const hideModals = () => {
		_history = [];
		_options.clear();

		history.set(_history);
		options.set(_options);
	};

	const replaceModal = (modalId: string, modalOptions: unknown = {}) => {
		_options.delete(_history.at(-1) || '');
		_options.set(modalId, modalOptions);
		_history = [..._history.slice(0, -1), modalId];

		history.set(_history);
		options.set(_options);
	};

    const setModalOptions = (modalId: string, modalOptions: unknown) => {
		_options.set(modalId, modalOptions);

		options.set(_options);
	};

	return {
		history,
		options,
		showModal,
		hideModal,
		hideModals,
		replaceModal,
		setModalOptions
	};
}

export const modalsStore = createModalsStore();
