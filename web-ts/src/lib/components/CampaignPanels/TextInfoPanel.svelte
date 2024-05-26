<script lang="ts">
	import InputText from '../Input/InputText.svelte';
	import Panel from '../Panels/Panel.svelte';
	import { campaignStore } from '$lib/stores/campaign.store';
	import Textarea from '../Textarea/Textarea.svelte';
	import { getContext } from 'svelte';
	import InputLink from '../Input/InputLink.svelte';
	import { slide } from 'svelte/transition';
	import Icon from '../Icon/Icon.svelte';
	import { mdiPlusCircle, mdiTrashCanOutline } from '@mdi/js';
	import { DEFAULT_ADDITIONAL_LINK } from '$lib/constants/default-additional-link.constants';

	const { title, subtitle, description, additionalLinks } = campaignStore;

	const { setIsValid } = getContext<{ setIsValid: (value: boolean) => void }>('campaignPanels');

	$: {
		if (
			$title &&
			$description &&
			$additionalLinks.every(({ key, value }) => (key && value) || (!key && !value))
		) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}
</script>

<Panel class="top-10">
	<div class="font-semibold text-[28px]">General</div>

	<div class="text-[16px] text-[#666]">Provide general information for your campaign</div>

	<div class="space-y-6 mt-8">
		<InputText
			class="rounded-lg h-9"
			maxlength={120}
			bind:value={$title}
			placeholder="Enter title"
			><div slot="label" class="font-medium required">Title</div></InputText
		>

		<InputText
			class="rounded-lg h-9"
			maxlength={200}
			bind:value={$subtitle}
			placeholder="Enter subtitle"
			><div slot="label" class="font-medium">Subtitle</div></InputText
		>

		<Textarea
			class="rounded-lg h-24"
			maxlength={2000}
			bind:value={$description}
			placeholder="Enter description"
			><div slot="label" class="required font-medium">Description</div></Textarea
		>

		<div>
			<div class="font-medium">Additional links</div>

			{#each [...$additionalLinks] as _additionalLink, index}
				<div class="mt-1" transition:slide={{ axis: 'y', duration: 200 }}>
					<div
						class="grid grid-cols-[120px_1fr_24px] gap-2 items-baseline"
						class:!grid-cols-[120px_1fr]={$additionalLinks.length === 1}
					>
						<InputText
							bind:value={$additionalLinks[index].key}
							class="rounded-lg h-9"
							maxlength={200}
							placeholder="Name"
						/>
						<InputLink
							value={$additionalLinks[index].value}
							maxlength={10000}
							class="rounded-lg h-9"
							placeholder="Additional link"
							on:change={({ detail }) => ($additionalLinks[index].value = detail)}
						/>
						{#if $additionalLinks.length > 1}
							<Icon
								path={mdiTrashCanOutline}
								size={24}
								color="#666"
								class="cursor-pointer translate-y-[6px]"
								on:click={() =>
									($additionalLinks = [
										...$additionalLinks.filter((_, i) => i !== index)
									])}
							/>
						{/if}
					</div>
				</div>
			{/each}

			<div class="flex items-center justify-start gap-1 mt-2">
				<Icon
					path={mdiPlusCircle}
					size={32}
					class="cursor-pointer"
					on:click={() =>
						($additionalLinks = [...$additionalLinks, DEFAULT_ADDITIONAL_LINK()])}
				/>
				<!-- <button
					class="font-medium"
					on:click={() =>
						($additionalLinks = [...$additionalLinks, DEFAULT_ADDITIONAL_LINK()])}
					>Add link</button
				> -->
			</div>
		</div>
	</div>
</Panel>
