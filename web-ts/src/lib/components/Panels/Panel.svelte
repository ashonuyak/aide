<script lang="ts">
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	export { classes as class };
	let classes: string = '';
	const defaultClasses: string = 'absolute inset-0 h-full w-full bg-[#fff]';

	const { isNext } = getContext<{ isNext: SvelteStore<boolean> }>('isNext');
</script>

<div
	class={twMerge(defaultClasses, classes)}
	in:fly={{ x: $isNext ? 100 : -100, duration: 400, opacity: 1 }}
>
	<slot />
</div>

<style>
	div {
		height: calc(100% - 40px - 88px);
		overflow: auto;
	}
	div::-webkit-scrollbar {
		display: none;
	}
</style>
