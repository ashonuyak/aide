<script lang="ts">
	import { mdiCloseCircle, mdiMagnify } from '@mdi/js';
	import Icon from '../Icon/Icon.svelte';
	import { twMerge } from 'tailwind-merge';

	export let value: string = '';
	export let placeholder: string = '';

	export { classes as class };
	let classes: string = '';
	const defaultClasses: string = 'flex pb-2 border-b border-b-[#e8e8e8]';
</script>

<div class={twMerge(defaultClasses, classes)}>
	<Icon
		class="mr-[12px]"
		color="rgb(68, 68, 68)"
		path={mdiMagnify}
		size="24px"
		on:click={() => (value = '')}
	/>

	<label for="search-input"></label>

	<input
		id="search-input"
		type="text"
		{placeholder}
		bind:value
		class="text-[#444] text-base font-regular w-full border-none"
	/>

	{#if value}
		<Icon
			color="rgb(68, 68, 68)"
			class="cursor-pointer"
			path={mdiCloseCircle}
			size="24px"
			on:click={() => (value = '')}
		/>
	{/if}

	<slot></slot>
</div>

<style>
	#search-input::placeholder {
		color: #999999;
	}
</style>
