<script lang="ts">
	import PrimaryButton from '../Button/PrimaryButton.svelte';
	import Modal from './Modal.svelte';
	import { modalsStore } from '$lib/stores/modals.store';
	import { Status } from '@aide/sdk';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { resetCampaignCreateStores } from '$lib/stores/resetCampaignCreateStores';
	import { createCampaign } from '$lib/services/campaign-api.service';

	export let id: string = '';

	const queryClient = useQueryClient();

	const { hideModals } = modalsStore;

	let isActivePublishLoading: boolean = false;

	let isDraftPublishLoading: boolean = false;

	function publish(status: Status) {
		if (status === Status.Active) {
			isActivePublishLoading = true;
		} else {
			isDraftPublishLoading = true;
		}

		createCampaign(status).then(() => {
			isActivePublishLoading = false;
			isDraftPublishLoading = false;

			hideModals();
			queryClient.invalidateQueries({
				queryKey: ['getFundraiserCampaigns']
			});
			resetCampaignCreateStores();
		});
	}
</script>

<Modal bind:id>
	<div class="w-[480px] py-6 px-8">
		<div class="font-medium text-2xl">You are almost there!</div>

		<PrimaryButton
			loading={isActivePublishLoading}
			class="h-10 rounded-lg font-medium mt-6"
			on:click={() => publish(Status.Active)}>Publish immediately</PrimaryButton
		>

		<PrimaryButton
			loading={isDraftPublishLoading}
			class="h-10 mt-2 rounded-lg font-medium bg-transparent text-[#222] hover:bg-[#f1f1f1]"
			on:click={() => publish(Status.Draft)}>Create as draft</PrimaryButton
		>
	</div>
</Modal>
