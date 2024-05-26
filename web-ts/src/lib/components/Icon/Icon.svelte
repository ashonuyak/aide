<script lang="ts">
	import type { AriaRole } from 'svelte/elements';

	export let size: string | number = '1em';
	export let color = 'currentColor';
	export let path: string;
	export let title: string | null = null;
	export let desc = '';
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
	class="{className}"
	class:-rotate-180={flipped}
	{role}
	aria-label={ariaLabel}
	aria-hidden={ariaHidden}
	aria-labelledby={ariaLabelledby}
    on:click
>
	{#if title}
		<title>{title}</title>
	{/if}
	{#if desc}
		<desc>{desc}</desc>
	{/if}
	<path d={path} fill={color} />
</svg>
