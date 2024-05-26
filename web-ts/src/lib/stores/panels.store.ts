import { writable } from 'svelte/store';

function createPanelsStore() {
	let _current: string | null = null;
	let _previous: string | null = null;
	let _history: Array<string> = [];
	const _options: Map<string, unknown> = new Map();

	const current = writable<string | null>();
	const previous = writable<string | null>();
	const history = writable<Array<string>>([]);
	const options = writable<Map<string, unknown>>(new Map());

	const setPrevious = () => {
		_current = _history[_history.length - 1];
		_previous = _history[_history.length - 2] || null;
		_history = _history.slice(0, -1);

		history.set(_history);
		current.set(_current);
		previous.set(_previous);
	};

	const setPanel = (panelId: string, panelOptions: unknown = {}) => {
		if (_current === panelId) return;

		_history = [..._history, panelId];
		_options.set(panelId, panelOptions);
		_previous = _current;
		_current = panelId;

		history.set(_history);
		options.set(_options);
		current.set(_current);
		previous.set(_previous);
	};

	const undoPanel = () => {
		setPrevious();
	};

	const replacePanel = (panelId: string) => {
		if (_current === panelId) return;

		if (_previous === panelId) {
			return setPrevious();
		}

		_current = panelId;

		current.set(_current);
	};

	const setPanelOptions = (panelId: string, panelOptions: unknown) => {
		_options.set(panelId, panelOptions);

		options.set(_options);
	};

	const reset = () => {
		_current = null;
		_previous = null;
		_history = [];
		_options.clear();

		current.set(null);
		previous.set(null);
		history.set([]);
		options.set(new Map());
	};

	return {
		current,
		previous,
		history,
		options,
		setPanel,
		replacePanel,
		undoPanel,
		setPanelOptions,
		reset
	};
}

export const panelsStore = createPanelsStore();
