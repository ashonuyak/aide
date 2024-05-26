<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let selected: boolean = false;
	export let activeClass = 'opacity-100';
	export let inactiveClass = 'opacity-60';
</script>

<img
	alt="..."
	{...$$restProps}
	class={twMerge(selected ? activeClass : inactiveClass, $$props.class)}
/>
