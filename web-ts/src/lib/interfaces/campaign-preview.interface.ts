import type { AdditionalLinkDto, CategoryAddOns, PaymentCardDto } from '@aide/sdk';
import type { ICampaignCardPreview } from './campaign-card-preview.interface';

export interface ICampaignPreview extends ICampaignCardPreview {
	additionalLinks: AdditionalLinkDto[];
	categoryAddOns: CategoryAddOns;
	payPalEnabled: boolean;
	paymentCards: PaymentCardDto[];
	qrCodeUrl: string | null;
	qrCodeSrc: string | null;
	media: string[];
}
