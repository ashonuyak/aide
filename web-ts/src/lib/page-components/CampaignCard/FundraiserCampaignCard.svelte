<script lang="ts">
	import imagePlaceholder from '$lib/assets/campaign-card-image-placeholder.svg';
	import { scale } from 'svelte/transition';
	import type { ICampaignCard } from './campaign-card.interface';
	import { categories } from '$lib/stores/categories.store';
	import { createEventDispatcher } from 'svelte';
	import { STATUS } from '$lib/constants/status.constants';
	import { STATUS_COLOR } from '$lib/constants/status-color.constants';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import DotsButton from '$lib/components/Dropdown/DotsButton.svelte';
	import { Status } from '@aide/sdk';

	export let campaign: ICampaignCard;

	const category = $categories.find(({ _id }) => _id === campaign.categoryId) || {
		title: 'No way',
		color: 'maroon'
	};
	const { title: categoryTitle, color } = category;

	const dispatch = createEventDispatcher();
</script>

<div class="relative card-container" in:scale={{ start: 0.9, duration: 200 }}>
	<!-- wrapper -->
	<div class="w-full h-full card-wrapper flex flex-col rounded-lg bg-[#fff] overflow-hidden">
		<!-- header -->
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

		<!-- body -->
		<div class="flex flex-col px-3 py-4 justify-between flex-grow max-h-[400px]">
			<div
				class="bg-chocolate flex items-center justify-center overflow-hidden rounded-2xl flex-grow"
			>
				<img src={campaign.mainImage || imagePlaceholder} alt={campaign.title} />
			</div>

			<div>
				<div class="font-semibold mt-3 line-clamp-2">{campaign.title}</div>

				<div class="mt-2 text-[14px] line-clamp-3">
					{campaign.subtitle || campaign.description}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card-wrapper {
		box-shadow:
			0px 0px 0px 1px rgba(0, 0, 0, 0.04),
			0px 4px 6px 0px rgba(0, 0, 0, 0.08);
	}

	.card-container {
		transition: transform 0.15s ease-in-out;
	}

	.card-container:hover {
		transform: scale(1.05);
	}
</style>
