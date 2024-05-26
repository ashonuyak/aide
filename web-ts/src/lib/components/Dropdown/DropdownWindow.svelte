<script lang="ts">
	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	export { classes as class };
	let classes: string = '';

	const defaultClasses: string =
		'overflow-y-auto absolute right-0 z-10 mt-1 w-full origin-top-right bg-[#fff] rounded-lg outline-none p-2';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={twMerge(defaultClasses, classes)}
	role="menu"
	aria-orientation="vertical"
	aria-labelledby="menu-button"
	tabindex="-1"
	transition:slide={{ axis: 'y', duration: 50 }}
	on:click
>
	<div role="none">
		<slot />
	</div>
</div>

<style>
	div[role='menu'] {
		box-shadow:
			0px 0px 0px 1px rgba(0, 0, 0, 0.04),
			0px 4px 6px 0px rgba(0, 0, 0, 0.08);
	}
</style>
