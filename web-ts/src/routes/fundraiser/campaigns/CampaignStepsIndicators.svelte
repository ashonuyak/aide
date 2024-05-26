<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let steps: string[] = [];
	export let current = 0;

	const progress = tweened(current, {
		duration: 400,
		easing: cubicOut
	});

    $: progress.set(current);
</script>

<progress max={steps.length} value={$progress} />

<style>
	progress[value] {
		appearance: none;
		border: none;
		-webkit-mask:
			radial-gradient(circle closest-side, #000 98%, #0000 102%) 0/12.5% 100%,
			linear-gradient(90deg, #000 50%, #0000 0) 8%/25% 100%;
	}
	progress[value]::-webkit-progress-bar {
		background: lightgrey;
	}
	progress[value]::-webkit-progress-value {
		background: #1d1d1b;
	}
	progress[value]::-moz-progress-bar {
		background: #1d1d1b;
	}

	progress {
		display: block;
		/* width: 100%; */
	}
</style>
