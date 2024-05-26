<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { twMerge } from 'tailwind-merge';
	import type { State } from './Carousel.svelte';
	import Indicator from '../Indicators/Indicator.svelte';

	export let activeClass = 'opacity-100';
	export let inactiveClass = 'opacity-60';

	const state = getContext<Writable<State>>('state');
</script>

<div
	class={twMerge(
		'flex absolute bottom-5 start-1/2 z-30 space-x-3 rtl:space-x-reverse -translate-x-1/2 rtl:translate-x-1/2',
		$$props.class
	)}
>
	{#each $state.images as _, idx}
		{@const selected = $state.index === idx}
		<button on:click={() => ($state.index = idx)}>
			<slot {Indicator} {selected} index={idx}>
				<Indicator
					class={twMerge(
						'bg-gray-100 hover:bg-gray-300',
						selected ? activeClass : inactiveClass
					)}
				/>
			</slot>
		</button>
	{/each}
</div>
