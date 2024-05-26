<script lang="ts">
	import SimpleHeader from '$lib/components/Header/SimpleHeader.svelte';
	import PublicMain from '$lib/components/Main/PublicMain.svelte';
	import InputText from '$lib/components/Input/InputText.svelte';

	let code = '    ';

    function onDigitInput(event: Event, index: number) {
        const codeArray = code.split('');

        codeArray[index] = event.target.value;

        code = codeArray.join('');
    }
</script>

<SimpleHeader />

<PublicMain>
	<div class="flex flex-col w-full h-full items-center justify-center gap-[80px]">
		<div class="text-[48px] font-semibold">Please enter verification code</div>

		<div class="flex gap-4">
			{#each code.split('') as _, index}
				<InputText
					maxlength={1}
					class="w-20 h-20 rounded-lg border-2 !text-center font-semibold text-3xl"
					on:input={(event) => onDigitInput(event, index)}
				/>
			{/each}
		</div>
	</div>
</PublicMain>
