// Define the TypeScript types for the Svelte action
type ClickOutsideAction = (
	node: HTMLElement,
	callbackFunction: () => void
) => {
	// update: (newCallbackFunction: () => void) => void;
	destroy: () => void;
};

/**
 * A Svelte action that triggers a callback when a click occurs outside the specified element.
 *
 * @param node - The HTML element to monitor for outside clicks.
 * @param callback - The function to call when an outside click is detected.
 * @returns An object with methods to update the callback and clean up the event listener.
 */
export const clickOutside: ClickOutsideAction = (node, callback) => {
	function onClick(event: MouseEvent) {
		// Only call the callback if the click is outside the node
		if (!node.contains(event.target as Node)) {
			callback();
		}
	}

	// Listen to clicks on the entire document
	document.addEventListener('click', onClick, true); // Use capture phase

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
};
