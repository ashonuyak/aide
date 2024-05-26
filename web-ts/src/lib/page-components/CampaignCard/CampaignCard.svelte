<script lang="ts">
	import imagePlaceholder from '$lib/assets/campaign-card-image-placeholder.svg';
	import { scale } from 'svelte/transition';
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import type { ICampaignCard } from '$lib/page-components/CampaignCard/campaign-card.interface';
	import { categories } from '$lib/stores/categories.store';
	import type { UserMappedDto } from '@aide/sdk';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let campaign: ICampaignCard;

	export let fundraiser: UserMappedDto;

	const category = $categories.find(({ _id }) => _id === campaign.categoryId) || {
		title: 'No way',
		color: 'maroon'
	};
	const { title: categoryTitle, color } = category;
</script>

<div class="relative card-container max-w-[400px]" in:scale={{ start: 0.9, duration: 200 }}>
	<!-- wrapper -->
	<div class="w-full h-full card-wrapper flex flex-col rounded-lg bg-[#fff] overflow-hidden">
		<!-- header -->
		<div
			class="px-6 h-12 w-full bg-[#f3f3f3] flex items-center justify-between border-b border-b-[#e8e8e8]"
		>
			<div class="flex items-center gap-2">
				<Avatar
					src={fundraiser.avatarUrl}
					initials={fundraiser.initials}
					width="w-[24px]"
				/>

				<div class="text-sm font-medium">{fundraiser.username}</div>
			</div>

			<div
				class="px-2 py-[2px] bg-[#444] font-semibold text-[10px] text-[#fff] rounded-full truncate max-w-[200px]"
			>
				{categoryTitle}
			</div>
		</div>

		<!-- body -->
		<div class="flex flex-col px-6 py-6 justify-between flex-grow max-h-[480px]">
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

			<PrimaryButton class="mt-4 font-semibold" animate on:click={() => dispatch('donate')}>Donate now</PrimaryButton>
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
</style>
