import { sendFormDataRequest } from '$lib/api/send-form-data-request';
import { campaignStore } from '$lib/stores/campaign.store';
import type { CreateCampaignDto, Status } from '@aide/sdk';
import { get } from 'svelte/store';

export function createCampaign(status: Status) {
	const body: CreateCampaignDto = {
		title: get(campaignStore.title),
		subtitle: get(campaignStore.subtitle),
		description: get(campaignStore.description),
        additionalLinks: get(campaignStore.additionalLinks),
		categoryId: get(campaignStore.categoryId),
		categoryAddOns: get(campaignStore.categoryAddOns),
		paymentCards: get(campaignStore.paymentCards),
		payPalEnabled: get(campaignStore.payPalEnabled),
		qrCodeUrl: get(campaignStore.qrCodeUrl) || undefined,
		status
	};

	const files = {
		mainImage: Array.from(get(campaignStore.mainImage) || []),
		media: Array.from(get(campaignStore.media) || []),
		qrCode: Array.from(get(campaignStore.qrCodeFile) || [])
	};

	return sendFormDataRequest('/campaign', 'POST', body, files);
}

export function updateCampaign() {
	const body: Partial<CreateCampaignDto> & { _id: string } = {
		_id: get(campaignStore._id),
		title: get(campaignStore.title),
		subtitle: get(campaignStore.subtitle),
		description: get(campaignStore.description),
        additionalLinks: get(campaignStore.additionalLinks),
		categoryId: get(campaignStore.categoryId),
		categoryAddOns: get(campaignStore.categoryAddOns),
		paymentCards: get(campaignStore.paymentCards),
		payPalEnabled: get(campaignStore.payPalEnabled),
		qrCodeUrl: get(campaignStore.qrCodeUrl) || undefined
	};

	const mainImage = get(campaignStore.mainImage);
	const media = get(campaignStore.media);
	const qrCode = get(campaignStore.qrCodeFile);

	const files = {
		...(mainImage && { mainImage: Array.from(get(campaignStore.mainImage) || []) }),
		...(media && { media: Array.from(get(campaignStore.media) || []) }),
		...(qrCode && { qrCode: Array.from(get(campaignStore.qrCodeFile) || []) })
	};

	return sendFormDataRequest('/campaign', 'PATCH', body, files);
}
