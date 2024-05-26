<script lang="ts" context="module">
	export type State = {
		images: HTMLImgAttributes[];
		index: number;
		lastSlideChange: Date;
		slideDuration: number;
		forward: boolean;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, onMount, setContext } from 'svelte';
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import type { TransitionConfig } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	import Controls from './Controls.svelte';
	import Indicators from './Indicators.svelte';
	import Slide from './Slide.svelte';
	import { canChangeSlide } from './CarouselSlide';

	type TransitionFunc = (node: HTMLElement, params: any) => TransitionConfig;
	const SLIDE_DURATION_RATIO = 0.25;

	export let images: HTMLImgAttributes[];
	export let index: number = 0;
	export let slideDuration: number = 1000;
	export let transition: TransitionFunc | null = null;
	export let duration: number = 0;
	export let ariaLabel: string = 'Draggable Carousel';

	let divClass: string = 'grid overflow-hidden relative rounded-lg bg-[#222] h-56 sm:h-64 xl:h-80 2xl:h-96';
	export let imgClass: string = '';

	const dispatch = createEventDispatcher();

	const { set, subscribe, update } = writable<State>({
		images,
		index,
		forward: true,
		slideDuration,
		lastSlideChange: new Date()
	});

	const state = {
		set: (_state: State) =>
			set({
				index: _state.index,
				images: _state.images,
				lastSlideChange: new Date(),
				slideDuration,
				forward
			}),
		subscribe,
		update
	};

	let forward = true;

	setContext('state', state);

	subscribe((_state) => {
		index = _state.index;
		forward = _state.forward;
		dispatch('change', images[index]);
	});

	onMount(() => {
		dispatch('change', images[index]);
	});

	const nextSlide = () => {
		update((_state) => {
			if (
				!canChangeSlide({
					lastSlideChange: _state.lastSlideChange,
					slideDuration,
					slideDurationRatio: SLIDE_DURATION_RATIO
				})
			)
				return _state;

			_state.index = _state.index >= images.length - 1 ? 0 : _state.index + 1;
			_state.lastSlideChange = new Date();
			return { ..._state };
		});
	};

	const loop = (node: HTMLElement, duration: number) => {
		carouselDiv = node;

		let intervalId: any;

		if (duration > 0) intervalId = setInterval(nextSlide, duration);

		return {
			update: (duration: number) => {
				clearInterval(intervalId);
				if (duration > 0) intervalId = setInterval(nextSlide, duration);
			},
			destroy: () => clearInterval(intervalId)
		};
	};

	let carouselDiv: HTMLElement;
</script>

<svelte:head>
	{#if images.length > 0}
		{#each images as image}
			<link rel="preload" href={image.src} as="image" />
		{/each}
	{/if}
</svelte:head>

<div bind:this={carouselDiv} class="relative" role="button" aria-label={ariaLabel} tabindex="0">
	<div {...$$restProps} class={twMerge(divClass, $$props.class)} use:loop={duration}>
		<slot name="slide" {Slide} {index}>
			<Slide image={images[index]} class={imgClass} {transition} />
		</slot>
	</div>
	<slot {index} {Controls} {Indicators} />
</div>
