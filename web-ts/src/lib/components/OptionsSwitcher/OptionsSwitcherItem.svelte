<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let active: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<button data-active={active} on:click={() => dispatch('click')}>
	<slot />
</button>

<style>
	button {
		height: 32px;
		color: #444444;
		font-size: 15px;
		font-family: inter-semibold;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border: none;
		padding: var(--padding, 7px 24px);
	}

	button[data-active='true'] {
		background-color: #fff;
		box-shadow: 0px 2px 4px 0px #0000001f;
		border-radius: 6px;
		z-index: 1;
	}

	button:first-child {
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
	}

	button:last-child {
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
	}

	button:not(:last-child) {
		margin-right: -2px;
	}
</style>
