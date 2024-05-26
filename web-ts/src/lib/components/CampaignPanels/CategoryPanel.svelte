<script lang="ts">
	import Panel from '../Panels/Panel.svelte';
	import { categories } from '$lib/stores/categories.store';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import { campaignStore } from '$lib/stores/campaign.store';
	import tooltip from '$lib/directives/use/tooltip.directive';
	import { UKRAINIAN_REGIONS } from '$lib/constants/ukrainian-regions.constants';
	import InfoTooltip from '../InfoTooltip/InfoTooltip.svelte';
	import { getContext } from 'svelte';

	const { categoryId, categoryAddOns } = campaignStore;

	let isCategoryDropdownOpen: boolean = false;
	let isRegionsDropdownOpen: boolean = false;

	$: selectedCategoryTitle = $categories.find(({ _id }) => _id === $categoryId)?.title;
	$: isUkrainianArmyCategory = selectedCategoryTitle === 'Armed Forces of Ukraine';

	function onCategorySelect(id: string) {
		$categoryId = id;
		isCategoryDropdownOpen = false;
	}

	function onRegionSelect(region: string) {
		$categoryAddOns = { ...$categoryAddOns, region };
		isRegionsDropdownOpen = false;
	}

	const { setIsValid } = getContext<{ setIsValid: (value: boolean) => void }>('campaignPanels');

	$: {
		if ($categoryId && (!isUkrainianArmyCategory || (isUkrainianArmyCategory && $categoryAddOns.region))) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}
</script>

<Panel class="top-[40px]">
	<div class="font-semibold text-[28px]">Category</div>

	<div class="text-[16px] text-[#666]">Choose category for your campaign</div>

	<div class="space-y-[24px] mt-[32px]">
		<div>
			<Dropdown let:Components bind:open={isCategoryDropdownOpen}>
				<span slot="title">{selectedCategoryTitle || 'Choose category'}</span>
				<Components.DropdownWindow class="max-h-[200px] border-2 border-[#e8e8e8] !shadow-none">
					{#each $categories as category}
						<Components.DropdownItem on:click={() => onCategorySelect(category._id)}
							><span use:tooltip={{ content: category.subtitle, appendTo: 'parent' }}>
								{category.title}
							</span></Components.DropdownItem
						>
					{/each}
				</Components.DropdownWindow>
			</Dropdown>
		</div>

		{#if selectedCategoryTitle === 'Armed Forces of Ukraine'}
			<div>
				<div class="font-medium flex items-center gap-1">
					<span class="translate-y-[-1px]">Ukrainian region</span>
					<InfoTooltip
						options={{
							content:
								'Specify region, so that users could find campaigns for their region',
							appendTo: 'parent'
						}}
						size={16}
					/>
				</div>

				<Dropdown let:Components bind:open={isRegionsDropdownOpen}>
					<span slot="title">{$categoryAddOns.region || 'Choose region'}</span>
					<Components.DropdownWindow class="max-h-[200px] border-2 border-[#e8e8e8] !shadow-none">
						{#each UKRAINIAN_REGIONS as region}
							<Components.DropdownItem on:click={() => onRegionSelect(region)}
								>{region}</Components.DropdownItem
							>
						{/each}
					</Components.DropdownWindow>
				</Dropdown>
			</div>
		{/if}
	</div>
</Panel>
