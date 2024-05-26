<script lang="ts">
	import { activeDropdownId } from './store';
	import { clickOutside } from '$lib/directives/use/click-outside.directive';
	import DropdownWindow from './DropdownWindow.svelte';
	import DropdownItem from './DropdownItem.svelte';
	import TitleButton from './TitleButton.svelte';

	export let button: ConstructorOfATypedSvelteComponent = TitleButton;
	export let open: boolean = false;
	export { classes as class };
	let classes: string = '';

	const componentId = crypto.randomUUID();

	const Components = { DropdownWindow, DropdownItem };

	function handleClick(event: Event) {
		event.stopPropagation();

		if (isOpen) {
			$activeDropdownId = null;
		} else {
			$activeDropdownId = componentId;
			open = true;
		}
	}

	$: isOpen = open && $activeDropdownId === componentId;
</script>

<div class="relative" use:clickOutside={() => ($activeDropdownId = null)}>
	<svelte:component this={button} class={classes} on:click={handleClick}
		><slot name="title" /></svelte:component
	>

	{#if isOpen}
		<slot {Components} />
	{/if}
</div>
