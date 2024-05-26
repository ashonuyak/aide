<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import Icon from '../Icon/Icon.svelte';
	import { mdiClose } from '@mdi/js';

	export let open: boolean = false;
</script>

{#if open}
	<div
		class="w-screen h-screen fixed inset-0 bg-[#fff]"
		in:fly={{ y: '-40vh', duration: 250 }}
		out:fly={{ y: '-40vh', duration: 100 }}
	>
		<div class="close-button">
			<Icon size={32} path={mdiClose} on:click={() => (open = false)} />
		</div>

		<div class="modal-content"><slot /></div>
	</div>
{/if}

<style>
	.close-button {
		position: absolute;
		right: 24px;
		top: 24px;
		cursor: pointer;
		padding: 4px;
		border-radius: 100px;
	}

	.close-button:hover {
		background-color: #f6f6f6;
	}

    .close-button:active {
        background-color: #ddd;

    }

	.modal-content {
	}
</style>
