<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ErrorMessage from '../Form/ErrorMessage.svelte';
	import { twMerge } from 'tailwind-merge';
	import { isValidURL } from '$lib/utils/is-valid-url.util';

	export let value: string = '';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let maxlength: number | null = null;
	export let id: string = crypto.randomUUID();

	export { classes as class };
	let classes: string = '';

    const dispatch = createEventDispatcher();

	let errorMessage: string = '';

    function validate(event: Event) {
        event.preventDefault();

        if (isValidURL(value)) {
            dispatch('change', value);
            errorMessage = '';
        } else {
            errorMessage = 'Invalid URL';
        }
    }

    const errorClasses: string = 'border-[#D64328] bg-[#FFF4F2]';
</script>

<div class="relative">
	{#if $$slots.label}
		<label for={id}><slot name="label" /></label>
	{/if}
	<input
		{id}
		class={twMerge([
			'w-full h-full p-[12px] text-[15px] leading-[16px] text-[#444] border-[2px] border-[#e8e8e8] rounded-[3px] caret-[#b9b8b8]',
			classes,
            errorMessage ? errorClasses : ''
		])}
		type="text"
		bind:value
		{placeholder}
		{disabled}
		{maxlength}
		on:change={validate}
		on:input
		class:invalid={!!errorMessage}
        spellcheck="false"
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
