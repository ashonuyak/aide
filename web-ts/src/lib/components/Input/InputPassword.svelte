<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { mdiEye, mdiEyeOff } from '@mdi/js';
	import Icon from '../Icon/Icon.svelte';
	import ErrorMessage from '../Form/ErrorMessage.svelte';

	export let textAlign: string = 'start';
	export let value: string = '';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let maxlength: number | null = null;

	export let validate: ((value: string) => [boolean, string]) | undefined = undefined;

	let errorMessage: string = '';

	if (validate) {
		const registerInput = getContext<Function>('registerInput');

		function validateFunction(): boolean {
			if (!validate) return true;

			const [isValid, message] = validate(value);

			if (isValid) {
				errorMessage = '';
				return true;
			} else {
				errorMessage = message || 'Invalid input';
				return false;
			}
		}

		onMount(() => {
			registerInput({
				validate: validateFunction
			});
		});
	}

	let hidden: boolean = true;
</script>

<div class="relative">
	{#if hidden}
		<input
			type="password"
			style:text-align={textAlign}
			bind:value
			{placeholder}
			{disabled}
			{maxlength}
			on:change
			on:input
			class:invalid={!!errorMessage}
			autocomplete="current-password"
		/>
		<Icon
			color="rgb(68, 68, 68)"
			path={mdiEyeOff}
			size="24px"
			class="absolute cursor-pointer right-[12px] top-[10px]"
			on:click={() => (hidden = !hidden)}
		/>
	{:else}
		<input
			type="text"
			style:text-align={textAlign}
			bind:value
			{placeholder}
			{disabled}
			{maxlength}
			on:change
			on:input
			class:invalid={!!errorMessage}
			autocomplete="current-password"
		/>
		<Icon
			color="rgb(68, 68, 68)"
			path={mdiEye}
			size="24px"
			class="absolute cursor-pointer right-[12px] top-[10px]"
			on:click={() => (hidden = !hidden)}
		/>
	{/if}
	{#if errorMessage}
		<ErrorMessage>{errorMessage}</ErrorMessage>
	{/if}
</div>

<slot />

<style>
	input {
		width: 100%;
		height: 100%;
		padding: 11px;
		box-sizing: border-box;
		font-size: 15px;
		line-height: 16px;
		color: rgb(68, 68, 68);
		position: relative;
		border: 2px solid rgb(232, 232, 232);
		border-radius: 3px;
		outline: none;
		resize: none;
		text-align: var(--input-text-align, 'start');
	}
</style>
