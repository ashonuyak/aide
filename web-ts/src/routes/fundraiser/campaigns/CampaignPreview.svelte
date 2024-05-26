<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import OptionsSwitcher from '$lib/components/OptionsSwitcher/OptionsSwitcher.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js';
	import Campaign from './Campaign.svelte';
	import { wizardStore } from '$lib/stores/wizard.store';
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import { updateCampaign } from '$lib/services/campaign-api.service';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { user } from '$lib/stores/user.store';
	import type { ICampaignCard } from '$lib/page-components/CampaignCard/campaign-card.interface';
	import CampaignCard from '$lib/page-components/CampaignCard/CampaignCard.svelte';

	export let selectedMode: number = 0;
	export { classes as class };
	export let campaign: ICampaignCard;

	const { isEditMode } = wizardStore;

	let classes: string = '';
	const defaultClasses: string =
		'bg-[#F8F8F8] w-full h-full border-l border-l-[#e8e8e8] relative flex flex-col';

	let isSaveLoading: boolean = false;

	const queryClient = useQueryClient();

	function save() {
		isSaveLoading = true;

		updateCampaign().then(() => {
			isSaveLoading = false;
			queryClient.invalidateQueries({
				queryKey: ['getFundraiserCampaigns']
			});
		});
	}
</script>

<div class={twMerge(defaultClasses, classes)}>
	<div
		class="flex items-center justify-end px-[10px] w-full h-[56px] bg-[#fff] border-b border-b-[#e8e8e8]"
	>
		<OptionsSwitcher let:Components>
			<Components.OptionsSwitcherItem
				active={selectedMode === 0}
				on:click={() => (selectedMode = 0)}
				--padding="7px 7px"
				><Icon path={mdiFullscreenExit} size={24} /></Components.OptionsSwitcherItem
			>
			<Components.OptionsSwitcherItem
				--padding="7px 7px"
				active={selectedMode === 1}
				on:click={() => (selectedMode = 1)}
				><Icon path={mdiFullscreen} size={24} /></Components.OptionsSwitcherItem
			>
		</OptionsSwitcher>

		{#if $isEditMode}
			<PrimaryButton
				loading={isSaveLoading}
				class="ml-2 w-20 h-9 rounded-xl font-medium text-sm"
				on:click={() => save()}>Save</PrimaryButton
			>
		{/if}
	</div>

	<div class="relative w-full h-full">
		<div class="position-absolute-center w-full h-full flex items-center justify-center">
			{#if selectedMode === 0}
				<div class="max-w-[400px]">
					<CampaignCard {campaign} fundraiser={$user} />
				</div>
			{:else}
				<Campaign {campaign} fundraiser={$user} />
			{/if}
		</div>
	</div>
</div>
