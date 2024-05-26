<script lang="ts">
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import { categories } from '$lib/stores/categories.store';
	import type { ICampaignCard } from './campaign-card.interface';
	import type { UserMappedDto } from '@aide/sdk';

	export let campaign: ICampaignCard;
	export let fundraiser: UserMappedDto;
	const category = $categories.find(({ _id }) => _id === campaign.categoryId) || {
		title: 'No way',
		color: 'maroon'
	};
	const { title: categoryTitle, color } = category;
</script>

<div
	class="px-6 h-12 w-full bg-[#f3f3f3] flex items-center justify-between border-b border-b-[#e8e8e8]"
>
	<div class="flex items-center gap-2">
		<Avatar src={fundraiser.avatarUrl} initials={fundraiser.initials} width="w-[24px]" />

		<div class="text-sm font-medium">{fundraiser.username}</div>
	</div>

	<div
		class="px-2 py-[2px] bg-[#444] font-semibold text-[10px] text-[#fff] rounded-full truncate max-w-[200px]"
	>
		{categoryTitle}
	</div>
</div>
