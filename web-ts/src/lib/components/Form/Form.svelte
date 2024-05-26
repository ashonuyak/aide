<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';

    export let classes: string = ''

	interface CustomElement {
		validate: () => boolean;
	}

	const dispatch = createEventDispatcher();
	let formElements: CustomElement[] = [];

	function registerInput(input: CustomElement) {
		formElements.push(input);
	}

	setContext('registerInput', registerInput);

	function handleSubmit() {
		let isValid = true;

		console.log('isValid :>> ', isValid);

		for (let input of formElements) {
			if (!input.validate()) {
				isValid = false;
			}
		}

		if (isValid) {
			dispatch('submit', { valid: true });
		} else {
			dispatch('submit', { valid: false });
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class={classes}>
	<slot />
</form>
