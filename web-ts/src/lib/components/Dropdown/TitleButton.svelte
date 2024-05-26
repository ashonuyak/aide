<script lang="ts">
	import { mdiChevronDown } from '@mdi/js';
	import { twMerge } from 'tailwind-merge';
	import Icon from '../Icon/Icon.svelte';
	export let open: boolean = false;

	export { classes as class };
	let classes: string = '';

	const defaultClasses =
		'flex items-center justify-between w-full font-medium text-[14px] text-[#444] bg-[#fff] rounded-lg border-2 border-[#e8e8e8] px-4 py-1';
</script>

<button
	type="button"
	class={twMerge(defaultClasses, classes)}
	id="menu-button-{crypto.randomUUID()}"
	aria-expanded={open}
	aria-haspopup="true"
	aria-label="Dropdown title"
	on:click
>
	<slot />
	<Icon path={mdiChevronDown} flipped={open} size={24} color="#666" />
</button>
