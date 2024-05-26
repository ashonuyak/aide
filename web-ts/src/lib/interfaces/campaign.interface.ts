import type { AdditionalLinkDto, PaymentCardDto } from '@aide/sdk';
import type { IFundraiser } from './fundraiser.interface';

export interface ICampaign {
	title: string;
	subtitle: string;
	description: string;
	mainImage: string;
	categoryName: string;
	media: string[];
	qrCode: string | null;
	qrCodeUrl: string | null;
	fundraiser: IFundraiser;
	additionalLinks: AdditionalLinkDto[];
	paymentCards: PaymentCardDto[];
	payPalEnabled: boolean;
}
