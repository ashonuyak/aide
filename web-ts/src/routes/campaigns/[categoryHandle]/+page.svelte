<script lang="ts">
	import { useGetCampaigns } from '$lib/api/index.js';
	import Search from '$lib/components/Search/Search.svelte';
	import { campaignsStore } from '$lib/stores/campaigns.store.js';
	import { mapCampaignCard } from '$lib/services/campaign-map.service.js';
	import CampaignCard from '$lib/page-components/CampaignCard/CampaignCard.svelte';
	import { UKRAINIAN_REGIONS } from '$lib/constants/ukrainian-regions.constants';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { mdiCheckBold } from '@mdi/js';

	export let data;

	let selectedRegion: string | undefined = undefined;
	const { campaigns, search } = campaignsStore;
	$campaigns = data.campaigns;
	$: categoryCampaigns = useGetCampaigns(data.campaigns, $search, data.selectedCategory?.handle);

	const isZSUCategory = data.selectedCategory?.handle === 'armed-forces-of-ukraine';
</script>

<div class="flex justify-between items-center mb-[40px]">
	<h1 class="font-medium text-[32px]">Fundraising campaigns</h1>
</div>

<Search placeholder="Search campaigns..." bind:value={$search} class="pr-2 items-center">
	{#if isZSUCategory}
		<Dropdown let:Components class="border-none px-2 py-1 pl-3 hover:bg-[#f1f1f1]">
			<span class="mr-2 font-semibold whitespace-nowrap" slot="title">{selectedRegion || 'Region'}</span>
			<Components.DropdownWindow class="w-[240px] max-h-[240px]">
				<Components.DropdownItem
					on:click={() => (selectedRegion = undefined)}
					class={!selectedRegion ? 'bg-[#f1f1f1]' : ''}
				>
					<div class="flex items-center justify-between">
						All
						{#if !selectedRegion}
							<Icon path={mdiCheckBold} size={14} />
						{/if}
					</div>
				</Components.DropdownItem>
				{#each UKRAINIAN_REGIONS as region}
					{@const isSelected = selectedRegion === region}
					<Components.DropdownItem
						class={isSelected ? 'bg-[#f1f1f1]' : ''}
						on:click={() => (selectedRegion = region)}
					>
						<div class="flex items-center justify-between">
							{region}
							{#if isSelected}
								<Icon path={mdiCheckBold} size={14} />
							{/if}
						</div></Components.DropdownItem
					>
				{/each}
			</Components.DropdownWindow>
		</Dropdown>
	{/if}
</Search>

<div
	class="grid grid-cols-4 laptopxl:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 grid-flow-row gap-6 mt-8"
>
	{#each $categoryCampaigns.data as campaign}
		<CampaignCard
			campaign={mapCampaignCard(campaign)}
			fundraiser={campaign.fundraiser}
			on:donate={() => (window.location.href = `/campaign/${campaign._id}`)}
		/>
	{/each}
</div>
