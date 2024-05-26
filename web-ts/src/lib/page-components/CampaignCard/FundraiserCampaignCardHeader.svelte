<script lang="ts">
	import DotsButton from '$lib/components/Dropdown/DotsButton.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import { STATUS_COLOR } from '$lib/constants/status-color.constants';
	import { STATUS } from '$lib/constants/status.constants';
	import { Status } from '@aide/sdk';
	import { createEventDispatcher } from 'svelte';
	import type { ICampaignCard } from './campaign-card.interface';
	import { categories } from '$lib/stores/categories.store';

	export let campaign: ICampaignCard;
	const category = $categories.find(({ _id }) => _id === campaign.categoryId) || {
		title: 'No way',
		color: 'maroon'
	};
	const { title: categoryTitle, color } = category;

	const dispatch = createEventDispatcher();
</script>

<div
	class="px-3 h-12 w-full bg-[#f3f3f3] flex items-center justify-between border-b border-b-[#e8e8e8]"
>
	<div class="font-semibold truncate">{categoryTitle}</div>

	<div class="flex items-center gap-2">
		<div
			class="px-2 py-[2px] bg-[#444] font-semibold text-xs text-primary rounded-full truncate max-w-[200px]"
			style="background-color: {STATUS_COLOR[campaign.status]}"
		>
			{STATUS[campaign.status]}
		</div>

		<Dropdown let:Components button={DotsButton}>
			<Components.DropdownWindow class="max-h-[200px] min-w-[120px] max-w-[240px]">
				{#if campaign.status === Status.Active}
					<Components.DropdownItem on:click={() => dispatch('pause')}
						>Pause</Components.DropdownItem
					>
				{:else}
					<Components.DropdownItem on:click={() => dispatch('publish')}
						>Publish</Components.DropdownItem
					>
				{/if}
				<Components.DropdownItem on:click={() => dispatch('edit')}
					>Edit</Components.DropdownItem
				>
				<Components.DropdownItem on:click={() => dispatch('delete')}
					>Delete</Components.DropdownItem
				>
			</Components.DropdownWindow>
		</Dropdown>
	</div>
</div>
