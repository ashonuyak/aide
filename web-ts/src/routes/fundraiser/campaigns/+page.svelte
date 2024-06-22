<script lang="ts">
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import Search from '$lib/components/Search/Search.svelte';
	import { modalsStore } from '$lib/stores/modals.store';
	import { campaignsStore } from '$lib/stores/campaigns.store';
	import { campaignStore } from '$lib/stores/campaign.store';
	import CampaignModal from './CampaignModal.svelte';
	import DeleteModal from '$lib/components/Modal/DeleteModal.svelte';
	import {
		useChangeCampaignStatus,
		useDeleteCampaign,
		useGetFundraiserCampaigns
	} from '$lib/api/index';
	import { type FundraiserCampaignResponseDto, Status } from '@aide/sdk';
	import { wizardStore } from '$lib/stores/wizard.store';
	import { resetCampaignCreateStores } from '$lib/stores/resetCampaignCreateStores';
	import paypalImg from '$lib/assets/paypal.webp';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import { STATUS } from '$lib/constants/status.constants';
	import { mdiCheckBold } from '@mdi/js';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import CampaignCard from '$lib/page-components/CampaignCard/CampaignCard.svelte';
	import { user } from '$lib/stores/user.store';
	import FundraiserCampaignCard from '$lib/page-components/CampaignCard/FundraiserCampaignCard.svelte';
	import QrCode from '$lib/components/QRCode/QRCode.svelte';

	export let data;

	function handleCampaignModalClose() {
		if (wizardStore.isEditMode) {
			resetCampaignCreateStores();
		}
	}

	let createCampaignModalId: string;

	let deleteCampaignModalId: string;

	const { campaigns, status, search } = campaignsStore;
	$campaigns = data.campaigns;
	$: fundraiserCampaigns = useGetFundraiserCampaigns(data.campaigns, $search, $status);

	const deleteCampaign = useDeleteCampaign();
	const changeCampaignStatus = useChangeCampaignStatus();

	function handleDeleteCampaignClick(_id: string) {
		modalsStore.showModal(deleteCampaignModalId, { campaignId: _id });
	}

	async function handleSubmitDelete({ detail }: { detail: string }) {
		await $deleteCampaign.mutateAsync(detail);
		modalsStore.hideModal(deleteCampaignModalId);
	}

	function handleEdit(campaign: FundraiserCampaignResponseDto) {
		wizardStore.isEditMode.set(true);
		campaignStore.setCampaign(campaign);
		modalsStore.showModal(createCampaignModalId);
	}

	function handlePublish(_id: string) {
		$changeCampaignStatus.mutate({ _id, status: Status.Active });
	}

	function handlePause(_id: string) {
		$changeCampaignStatus.mutate({ _id, status: Status.Paused });
	}
</script>

<div class="flex justify-between items-center mb-[40px]">
	<h1 class="font-medium text-[32px]">Campaigns</h1>

	<PrimaryButton
		class="w-[144px] h-[32px] rounded-[50px] font-semibold"
		animate
		on:click={() => modalsStore.showModal(createCampaignModalId)}>New campaign</PrimaryButton
	>
</div>

<Search placeholder="Search campaigns..." bind:value={$search} class="pr-2 items-center">
	<Dropdown let:Components class="border-none px-2 py-1 pl-3 hover:bg-[#f1f1f1]">
		<span class="mr-2 font-semibold" slot="title">{STATUS[$status] || 'Status'}</span>
		<Components.DropdownWindow class="w-[144px]">
			<Components.DropdownItem
				on:click={() => ($status = undefined)}
				class={!$status ? 'bg-[#f1f1f1]' : ''}
			>
				<div class="flex items-center justify-between">
					All
					{#if !$status}
						<Icon path={mdiCheckBold} size={14} />
					{/if}
				</div>
			</Components.DropdownItem>
			{#each Object.entries(STATUS).filter(([value]) => value !== Status.Deleted) as [value, name]}
				{@const isSelected = $status === value}
				<Components.DropdownItem
					on:click={() => ($status = value)}
					class={isSelected ? 'bg-[#f1f1f1]' : ''}
				>
					<div class="flex items-center justify-between">
						{name}
						{#if isSelected}
							<Icon path={mdiCheckBold} size={14} />
						{/if}
					</div>
				</Components.DropdownItem>
			{/each}
		</Components.DropdownWindow>
	</Dropdown>
</Search>

<div
	class="grid grid-cols-4 laptopxl:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 grid-flow-row gap-6 mt-8"
>
	{#each $fundraiserCampaigns.data as campaign (campaign._id)}
		<FundraiserCampaignCard
			{campaign}
			on:publish={() => handlePublish(campaign._id)}
			on:pause={() => handlePause(campaign._id)}
			on:edit={() => handleEdit(campaign)}
			on:delete={() => handleDeleteCampaignClick(campaign._id)}
		/>
	{/each}
</div>

<CampaignModal bind:id={createCampaignModalId} on:close={handleCampaignModalClose}></CampaignModal>

<DeleteModal
	bind:id={deleteCampaignModalId}
	loading={$deleteCampaign.isPending}
	on:submit={handleSubmitDelete}
>
	<div slot="title">Remove campaign?</div>
	<div slot="description">This can't be undone</div>
	<span slot="submit">Delete</span>
	<span slot="cancel">Cancel</span>
</DeleteModal>

<link rel="preload" href={paypalImg} as="image" />
