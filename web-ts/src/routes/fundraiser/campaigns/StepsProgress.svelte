<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let quantity: number = 0;
	export let current: number = 0;

    const dispatch = createEventDispatcher();
</script>

<div class="inline-flex items-center gap-[4px]">
	{#each Array(quantity) as _, index}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => dispatch('step-click', index)}
			class:active={current === index}
			class="step w-[12px] h-[6px] rounded-[4px] bg-[#e4e4e4]"
		></div>
	{/each}
</div>

<style>
    .step:not(.active) {
        cursor: pointer;
    }
    .step.active {
        background-color: #222;
    }
</style>
