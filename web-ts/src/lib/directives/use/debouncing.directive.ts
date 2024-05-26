type DebouncingOptions = {
	eventName: string;
	timeout: number;
};

// This function sets up debouncing for a given event.
function onEvent(node: Element, eventName: string, timeout: number) {
	let timeoutId: number | undefined;

	return function (event) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			const newEvent = new Event(eventName, { bubbles: true });
			node.dispatchEvent(newEvent);
		}, timeout);
	};
}

export function debouncing(node: Element, { eventName, timeout }: DebouncingOptions) {
	const handler = onEvent(node, eventName, timeout);

    console.log('eventName, timeout :>> ', eventName, timeout);

	// Listen to the original event and apply debouncing
	node.addEventListener(eventName, handler);

	return {
		destroy() {
			node.removeEventListener(eventName, handler);
		}
	};
}
