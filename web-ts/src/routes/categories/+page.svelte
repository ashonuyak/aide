<script lang="ts">
	import Category from './Category.svelte';

	export let data;

	console.log('data :>> ', data);

	const zsuCategory = data.categories[0];

	const plainCategories = data.categories.slice(1);
</script>

<div class="max-w-[1140px] text-center mx-auto">
	<div class="font-semibold text-4xl mb-20 text-[#fff]">Choose your category</div>

	<Category category={zsuCategory} />

	<div class="grid grid-cols-[1fr_1fr] gap-10 mt-10">
		{#each plainCategories as category}
			<Category {category} />
		{/each}
	</div>
</div>
