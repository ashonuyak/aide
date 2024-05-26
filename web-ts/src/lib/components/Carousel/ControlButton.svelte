<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { mdiChevronRightBox } from '@mdi/js';
	import Icon from '../Icon/Icon.svelte';

	export let forward: boolean;
	export let name: string;

	let buttonCls: string;
	$: buttonCls = twMerge(
		'flex absolute top-0 z-30 justify-center items-center px-4 h-full text-white',
		forward ? 'end-0' : 'start-0',
		$$props.class
	);
</script>

<button on:click type="button" class={buttonCls}>
	<slot>
		<!-- <span
			class="inline-flex justify-center items-center w-8 h-8 rounded-full"
		> -->
			{#if forward}
				<Icon path={mdiChevronRightBox} color="#fff" size={48} />
			{:else}
				<Icon path={mdiChevronRightBox} color="#fff" flipped size={48} />
			{/if}
			<span class="sr-only">{name}</span>
		<!-- </span> -->
	</slot>
</button>
