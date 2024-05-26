import { DEFAULT_ADDITIONAL_LINK } from '$lib/constants/default-additional-link.constants';
import { DEFAULT_PAYMENT_CARD } from '$lib/constants/default-payment-card.constants';
import type { AdditionalLinkDto, CampaignResponseDto, FundraiserCampaignResponseDto, PaymentCardDto } from '@aide/sdk';
import { get, writable } from 'svelte/store';
import { categories } from './categories.store';

function createCampaignStore() {
	const _id = writable<string>();
	const title = writable<string>();
	const subtitle = writable<string>();
	const description = writable<string>();
	const additionalLinks = writable<PaymentCardDto[]>([DEFAULT_ADDITIONAL_LINK()]);
	const categoryId = writable<string>();
	const mainImage = writable<FileList | null>();
	const mainImageSrc = writable<string>();
	const qrCodeFile = writable<FileList | null>();
	// file
	const qrCodeSrc = writable<string | null>();
	// from url
	const qrCodeUrl = writable<string | null>();
	const media = writable<FileList | null>();
	const mediaSrc = writable<string[]>([]);
	const categoryAddOns = writable<any>({});
	const paymentCards = writable<AdditionalLinkDto[]>([DEFAULT_PAYMENT_CARD()]);
	const payPalEnabled = writable<boolean>(false);

	const reset = () => {
		_id.set('');
		title.set('');
		subtitle.set('');
		description.set('');
		additionalLinks.set([DEFAULT_ADDITIONAL_LINK()]);
		categoryId.set('');
		mainImage.set(null);
		mainImageSrc.set('');
		qrCodeFile.set(null);
		qrCodeSrc.set('');
		media.set(null);
		mediaSrc.set([]);
		categoryAddOns.set({});
		paymentCards.set([DEFAULT_PAYMENT_CARD()]);
		payPalEnabled.set(false);
	};

	const setCampaign = (campaign: CampaignResponseDto | FundraiserCampaignResponseDto) => {
		_id.set(campaign._id);
		title.set(campaign.title);
		subtitle.set(campaign.subtitle || '');
		description.set(campaign.description);
		additionalLinks.set(campaign.additionalLinks || [DEFAULT_ADDITIONAL_LINK()]);
		categoryId.set(campaign.categoryId);
		// mainImage.set(null);
		mainImageSrc.set(campaign.mainImage);
		// qrCodeFile.set(null);
		qrCodeSrc.set(campaign.qrCode || null);
		qrCodeUrl.set(campaign.qrCodeUrl);
		// media.set(null);
		mediaSrc.set(campaign.media || []);
		categoryAddOns.set(campaign.categoryAddOns || {});
		paymentCards.set(campaign.paymentCards || [DEFAULT_PAYMENT_CARD()]);
		payPalEnabled.set(campaign.payPalEnabled);
	};

	const mappedCampaign = {
		title: get(title) || "Campaign's title here",
		subtitle: get(subtitle),
		description: get(description) || "Campaign's subtitle/description here",
		mainImage: get(mainImageSrc),
		// categoryName:
		// 	get(categories).find(({ _id }) => _id === get(categoryId))?.title || 'Category',
		additionalLinks: get(additionalLinks),
		categoryAddOns: get(categoryAddOns),
		payPalEnabled: get(payPalEnabled),
		paymentCards: get(paymentCards),
		qrCodeUrl: get(qrCodeUrl),
		qrCodeSrc: get(qrCodeSrc),
		media: get(mediaSrc)
	};

	return {
		_id,
		title,
		subtitle,
		description,
		additionalLinks,
		categoryId: {
			subscribe: categoryId.subscribe,
			set: (value: string) => {
				categoryId.set(value);
				categoryAddOns.set({});
			}
		},
		mainImage: {
			subscribe: mainImage.subscribe,
			set: (value: FileList) => {
				if (!value) return;

				const [file] = value;

				mainImage.set(value);

				const _file = new Image();
				const url = window.URL || window.webkitURL;

				_file.src = url.createObjectURL(file);

				_file.onload = () => {
					mainImageSrc.set(_file.src);
				};
			}
		},
		mainImageSrc,
		qrCodeFile: {
			subscribe: qrCodeFile.subscribe,
			set: (value: FileList) => {
				if (!value) return;

				const [file] = value;

				qrCodeFile.set(value);

				qrCodeUrl.set(null);

				const _file = new Image();
				const url = window.URL || window.webkitURL;

				_file.src = url.createObjectURL(file);

				_file.onload = () => {
					qrCodeSrc.set(_file.src);
				};
			}
		},
		qrCodeSrc,
		qrCodeUrl,
		media: {
			subscribe: media.subscribe,
			set: (value: FileList) => {
				if (!value) return;

				media.set(value);

				Array.from(value).forEach((file) => {
					const _file = new Image();
					const url = window.URL || window.webkitURL;

					_file.src = url.createObjectURL(file);

					_file.onload = () => {
						mediaSrc.update((arr) => [...Array.from(arr), _file.src]);
					};
				});
			}
		},
		mediaSrc,
		categoryAddOns,
		paymentCards,
		payPalEnabled,
		reset,
		setCampaign,
		mappedCampaign
	};
}

export const campaignStore = createCampaignStore();
