<script lang="ts">
	import FileDropzone from '../FileDropzone/FileDropzone.svelte';
	import Panel from '../Panels/Panel.svelte';
	import { campaignStore } from '$lib/stores/campaign.store';
	import Checkbox from '../Checkbox/Checkbox.svelte';
	import { fly } from 'svelte/transition';
	import { getContext } from 'svelte';

	const { mainImage, media, mainImageSrc, mediaSrc } = campaignStore;

	let additionalMediaChecked = !!$mediaSrc?.length;

	const { setIsValid } = getContext<{ setIsValid: (value: boolean) => void }>('campaignPanels');

	$: {
		if ($mainImageSrc) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}
</script>

<Panel class="top-[40px]">
	<div class="font-semibold text-[28px]">Media</div>

	<div class="text-[16px] text-[#666]">Upload your media files</div>

	<div class="space-y-[24px] mt-[32px]">
		<div>
			<div class="required font-medium">Main image</div>
			<FileDropzone
				accept="image/png, image/jpeg, video/*"
				name="campaign-main-image"
				bind:files={$mainImage}
				filesSrc={[$mainImageSrc]}
			></FileDropzone>
		</div>

		<div>
			<Checkbox bind:checked={additionalMediaChecked}>Additional media</Checkbox>
			{#if additionalMediaChecked}
				<div class="relative bg-[#fff] z-10 overflow-hidden mt-2">
					<div transition:fly={{ y: -100, duration: 100 }}>
						<FileDropzone
							accept="image/png, image/jpeg, video/*"
							name="campaign-media"
							multiple
							bind:files={$media}
							filesSrc={$mediaSrc}
							><div slot="message">
								<span class="font-medium">Upload additional media</span> or drag and
								drop
							</div></FileDropzone
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
</Panel>
