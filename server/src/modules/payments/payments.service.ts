import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
	constructor(private configService: ConfigService) {}

	async verifyIpn(data: string): Promise<boolean> {
		const axios = require('axios');
		const verificationResponse = await axios.post(
			'https://ipnpb.paypal.com/cgi-bin/webscr',
			data,
			{
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				timeout: 30000
			}
		);

        console.log('verificationResponse :>> ', verificationResponse);

		return verificationResponse.data === 'VERIFIED';
	}
}

// <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
//     <input type="hidden" name="cmd" value="_donations">
//     <input type="hidden" name="business" value="ashonuyak@gmail.com">
//     <input type="hidden" name="currency_code" value="USD">
//     <input type="hidden" name="item_name" value="Support the Cause!">
//     <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button">
//     <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
// </form>

// <script>
// function openPayPalWindow() {
//     var amount = prompt("Enter the amount you wish to donate:");
//     var url = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ashonuyak@gmail.com&currency_code=USD&amount=${amount}&return=https://daddy.ngrok.io/api&cancel_return=https://daddy.ngrok.io/api&notify_url=https://daddy.ngrok.io/api/payments/paypal-ipn`;
//     window.open(url, '_blank');
// }
// </script>

// <button onclick="openPayPalWindow()">Donate Custom Amount</button>
