<script>
	import { fade } from 'svelte/transition';
</script>

<div transition:fade={{ duration: 150 }}></div>

<style>
	div {
		position: fixed;
		opacity: 0.5;
		inset: 0;
		z-index: 1050;
		width: 100vw;
		height: 100vh;
		background-color: #000;
	}
</style>
