<script lang="ts">
	import { mdiClose } from '@mdi/js';
	import Icon from '../Icon/Icon.svelte';
	import { modalsStore } from '$lib/stores/modals.store';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let wrapperClass: string = '';
	export { classes as class };
	let classes = '';

	const defaultClasses: string = 'outline-0 rounded-2xl border-0 p-0';
	const defaultWrapperClasses: string = 'p-3 h-full w-full';

	export { id }
	const id: string = crypto.randomUUID();

	const dispatch = createEventDispatcher();

	const { history, hideModal } = modalsStore;

	let dialog: HTMLDialogElement;

	$: dialog && ($history.includes(id) ? showModal() : dialog.close());

	function showModal() {
		dialog.showModal();
		dispatch('show');
	}

	function closeModal() {
		dialog.close();
		dispatch('close');
		hideModal(id);
	}

	function onClickOutside() {
		dialog.animate(
			[{ transform: 'scale(1)' }, { transform: 'scale(1.005)' }, { transform: 'scale(1)' }],
			{
				duration: 400,
				direction: 'alternate'
			}
		);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			return onClickOutside();
		}
	}
</script>

<svelte:window></svelte:window>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:keydown={handleKeydown}
	on:click|self={onClickOutside}
	on:close={() => {
		hideModal(id);
	}}
	class={twMerge(defaultClasses, classes)}
>
	<div class={twMerge(defaultWrapperClasses, wrapperClass)}>
		<slot />

		<Icon
			size={32}
			path={mdiClose}
			on:click={closeModal}
			class="absolute top-3 right-3 cursor-pointer"
		/>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
