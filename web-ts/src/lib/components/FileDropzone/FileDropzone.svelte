<script lang="ts">
	export let files: FileList | null | undefined = undefined;
	export let filesSrc: string[] | null | undefined = undefined;
	export let fileInput: HTMLInputElement | undefined = undefined;
	export let name: string;
	export let disabled: boolean = false;
	export let accept: string = '';
	export let multiple: boolean = false;

	$: fileNames = files
		? Array.from(files || [])
				.map(({ name }) => name)
				.join(', ')
		: (filesSrc || []).map((name) => (name || '').split('/').at(-1)).join(', ');
</script>

<div
	class="border-[#d3d3d3] border-2 border-dashed rounded-[8px] p-4 py-8 rounded-container-token textarea relative flex justify-center items-center hover:border-[#aaa]"
	class:opacity-50={disabled}
>
	<input
		bind:files
		bind:this={fileInput}
		type="file"
		{name}
		class="w-full absolute inset-0 z-[1] opacity-0 disabled:!opacity-0 cursor-pointer"
		{disabled}
		{accept}
		{multiple}
		on:change
		on:dragenter
		on:dragover
		on:dragleave
		on:drop
		on:click
		on:keydown
		on:keyup
		on:keypress
		on:focus
		on:focusin
		on:focusout
	/>
	<!-- Interface -->
	<div class="flex justify-center items-center text-center">
		<div class="dropzone-interface-text">
			{#if $$slots.lead}
				<slot name="lead" />
			{/if}

			{#if fileNames}
				<span>{fileNames}</span>
			{:else}
				<slot name="message"
					><span class="font-semibold"
						>Upload {multiple ? 'multiple files' : 'a file'}</span
					> or drag and drop</slot
				>
			{/if}

			{#if $$slots.meta}
				<slot name="meta" />
			{/if}
		</div>
	</div>
</div>
