<script lang="ts">
	import CategoryPanel from '$lib/components/CampaignPanels/CategoryPanel.svelte';
	import MediaPanel from '$lib/components/CampaignPanels/MediaPanel.svelte';
	import PaymentPanel from '$lib/components/CampaignPanels/PaymentPanel.svelte';
	import TextInfoPanel from '$lib/components/CampaignPanels/TextInfoPanel.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import CampaignPreview from './CampaignPreview.svelte';
	import Panels from './Panels.svelte';
	import { onMount } from 'svelte';
	import { panelsStore } from '$lib/stores/panels.store';
	import { campaignStore } from '$lib/stores/campaign.store';
	import { categories } from '$lib/stores/categories.store';
	import { modalsStore } from '$lib/stores/modals.store';
	import logo from '$lib/assets/aide.svg';

	export let id: string = '';

	const panels = [
		{ name: 'text-info', component: TextInfoPanel },
		{ name: 'media', component: MediaPanel },
		{ name: 'category', component: CategoryPanel },
		{ name: 'payment', component: PaymentPanel }
	];

	onMount(() => {
		panelsStore.setPanel('text-info');
	});

	const {
		title,
		subtitle,
		description,
		mainImageSrc,
		categoryId,
		additionalLinks,
		categoryAddOns,
		payPalEnabled,
		paymentCards,
		qrCodeUrl,
		qrCodeSrc,
		mediaSrc
	} = campaignStore;

	$: console.log('$mediaSrc :>> ', $mediaSrc);

	$: campaignCard = {
		title: $title || "Campaign's title here",
		subtitle: $subtitle,
		description: $description || "Campaign's subtitle/description here",
		mainImage: $mainImageSrc,
		categoryId: $categoryId
	};

	$: campaign = {
		...campaignCard,
		additionalLinks: $additionalLinks,
		categoryAddOns: $categoryAddOns,
		payPalEnabled: $payPalEnabled,
		paymentCards: $paymentCards,
		qrCodeUrl: $qrCodeUrl,
		qrCodeSrc: $qrCodeSrc,
		media: $mediaSrc
	};
</script>

<Modal bind:id class="w-[95vw] h-[95vh]" wrapperClass="p-0" on:close>
	<div class="flex flex-col h-full">
		<div
			class="w-full h-[56px] bg-[#f3f3f3] flex items-center px-[32px] border-b border-b-[#e8e8e8]"
		>
			<img src={logo} alt="Aide logo" class="h-[24px]" />
		</div>
		<div class="flex h-full">
			<Panels
				class="w-[640px] mx-[32px] my-[24px]"
				{panels}
				on:close={() => modalsStore.hideModals()}
			/>
			<CampaignPreview {campaign} />
		</div>
	</div>
</Modal>
