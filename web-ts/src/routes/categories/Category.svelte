<script lang="ts">
	import type { GetCategoryDto } from '@aide/sdk';

	export let category: GetCategoryDto;
	export let height: string = '140px';
	export let color: string = 'black';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="w-full rounded-2xl border border-[#e8e8e8] relative category-container cursor-pointer"
	style="background-image: url({category.mediaUrl}); background-position: center; height: {height}"
    on:click={() => (window.location.href = `/campaigns/${category.handle}`)}
>
	<div
		class="absolute text-2xl top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 font-extrabold"
		style="color: {color}"
	>
		{category.title.toUpperCase()}
	</div>
</div>

<style>
	.category-container {
		transition: transform 0.15s ease-in-out;
	}
	.category-container:hover {
		transform: scale(1.05);
	}
</style>
