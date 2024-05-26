<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export { classes as class };
	let classes: string = '';

	const defaultClasses: string =
		'w-full text-left cursor-pointer rounded-lg px-4 py-[6px] text-[14px] font-medium text-[#222] hover:bg-[#f1f1f1]';
</script>

<button class={twMerge(defaultClasses, classes)} role="menuitem" tabindex="-1" id="menu-item-0" on:click>
	<slot />
</button>
