<script lang="ts">
	import type { AriaRole } from 'svelte/elements';

	export let size: string | number = '24';
	export let color = 'currentColor';
	export let flipped = false;
	export { className as class };
	export let viewBox = '0 0 24 24';
	export let role: AriaRole = 'img';
	export let ariaHidden: boolean | undefined = undefined;
	export let ariaLabel: string | undefined = undefined;
	export let ariaLabelledby: string | undefined = undefined;

	let className = '';
</script>

<svg
	width={size}
	height={size}
	{viewBox}
	class={className}
	class:-rotate-180={flipped}
	{role}
	aria-label={ariaLabel}
	aria-hidden={ariaHidden}
	aria-labelledby={ariaLabelledby}
	on:click
    fill="none"
>
	<path
		d="M9 8L5 12L9 16"
		stroke={color}
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M5 12H19"
		stroke={color}
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
