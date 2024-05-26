<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import ErrorMessage from '../Form/ErrorMessage.svelte';
	import { twMerge } from 'tailwind-merge';

	export let value: string = '';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let maxlength: number | null = null;
	export let id: string = crypto.randomUUID();

	export { classes as class };
	let classes: string = '';

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
</script>

<div class="relative">
	{#if $$slots.label}
		<label for={id}><slot name="label" /></label>
	{/if}
	<input
		{id}
		class={twMerge([
			'w-full h-full p-[12px] text-[15px] leading-[16px] text-[#444] border-[2px] border-[#e8e8e8] rounded-[3px] caret-[#b9b8b8]',
			classes
		])}
		type="text"
		bind:value
		{placeholder}
		{disabled}
		{maxlength}
		on:change
		on:input
		class:invalid={!!errorMessage}
	/>
	{#if errorMessage}
		<ErrorMessage>{errorMessage}</ErrorMessage>
	{/if}
	<slot />
</div>

<style>
	input {
		outline: none;
		resize: none;
		text-align: var(--input-text-align, 'start');
	}
</style>
