<script lang="ts">
	import { mdiDotsHorizontal } from '@mdi/js';
	import { twMerge } from 'tailwind-merge';
	import Icon from '../Icon/Icon.svelte';
	export let open: boolean = false;

	export { classes as class };
	let classes: string = '';

	const defaultClasses = 'flex items-center';
</script>

<button
	type="button"
	class={twMerge(defaultClasses, classes)}
	id="menu-button-{crypto.randomUUID()}"
	aria-expanded={open}
	aria-haspopup="true"
	aria-label="Three dots button"
	on:click
>
	<Icon path={mdiDotsHorizontal} size={24} color="#444" class="cursor-pointer " />
</button>
