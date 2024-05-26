<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PrimaryButton from '../Button/PrimaryButton.svelte';
	import Modal from './Modal.svelte';
	import { modalsStore } from '$lib/stores/modals.store';

	export let id: string = '';
	export let loading: boolean = false;

	const { options } = modalsStore;

	const dispatch = createEventDispatcher();
</script>

<Modal bind:id>
	<div class="w-[560px] py-6 px-12">
		<div class="font-medium text-2xl"><slot name="title" /></div>

		{#if $$slots.description}
			<div class="mt-2"><slot name="description" /></div>
		{/if}

		<PrimaryButton
			{loading}
			class="h-10 rounded-lg font-medium mt-6"
			on:click={() => dispatch('submit', $options.get(id).campaignId)}
			><slot name="submit" /></PrimaryButton
		>

		{#if $$slots.cancel}
			<PrimaryButton
				class="h-10 mt-2 rounded-lg font-medium bg-transparent text-[#222] hover:bg-[#f1f1f1]"
				on:click={() => modalsStore.hideModal(id)}><slot name="cancel" /></PrimaryButton
			>
		{/if}
	</div>
</Modal>
