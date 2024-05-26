<script lang="ts">
	import newTabIcon from '$lib/assets/new-tab.svg';
	import { ButtonType } from '$lib/enums/button-type.enum';
	import { twMerge } from 'tailwind-merge';
	import Loader from '../Loader/Loader.svelte';

	export let type: ButtonType = ButtonType.Button;
	export let href: string | undefined = undefined;
	export let target: string | undefined = undefined;
	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let animate: boolean = false;
	export let name: string = '';

	export { classes as class };

	let classes: string = '';

	let defaultClasses: string =
		'cursor-pointer flex items-center justify-center shadow-none bg-primary text-[#fff] rounded-[4px] border-none font-inherit py-[8px] h-[48px] w-full hover:bg-[#2f2f2f] disabled:bg-[#d2d2d2]';
</script>

{#if href}
	<a {href} {target}>
		<button
			class={twMerge(defaultClasses, classes)}
			{type}
			disabled={loading || disabled}
			class:animate
			{name}
			on:click
		>
			{#if loading}
				<Loader />
			{:else}
				<slot />
				{#if target === '_blank'}
					<img
						class="ml-1"
						src={newTabIcon}
						width="18"
						height="18"
						alt="Open in new tab"
					/>
				{/if}
			{/if}
		</button>
	</a>
{:else}
	<button
		disabled={loading || disabled}
		{type}
		on:click
		class={twMerge(defaultClasses, classes)}
		{name}
		class:animate
	>
		{#if loading}
			<Loader />
		{:else}
			<slot />
		{/if}
	</button>
{/if}

<style>
	button {
		transition: background-color 140ms ease-in-out;
		position: relative;
		overflow: hidden;
	}

	button.animate::after {
		animation: flash 5000ms infinite linear;
		background: linear-gradient(
			to right,
			#fff0 0%,
			#fff3 10%,
			#ffff 50%,
			#fff3 90%,
			#fff0 100%
		);
		content: '';
		height: 155px;
		left: -160px;
		opacity: 0.35;
		position: absolute;
		top: -50px;
		width: 160px;
	}

	button:disabled {
		cursor: not-allowed;
		transition: none;
		animation: none;
	}

	@keyframes flash {
		0%,
		45% {
			left: -160px;
		}

		55%,
		100% {
			left: 100%;
		}
	}
</style>
