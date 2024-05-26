import { Injectable } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/mail';
import { SendGridClient } from './clients/sendgrid-client';

@Injectable()
export class EmailService {
	constructor(private readonly sendGridClient: SendGridClient) {}

	async sendTestEmail(recipient: string, body = 'This is a test mail'): Promise<void> {
		const mail: MailDataRequired = {
			to: recipient,
			from: 'ashonuyak@gmail.com', //Approved sender ID in Sendgrid
			subject: 'Test email',
			content: [{ type: 'text/plain', value: body }]
		};
		await this.sendGridClient.send(mail);
	}

	async sendEmailWithTemplate(recipient: string, templateId: string, body?: any): Promise<void> {
		const mail: MailDataRequired = {
			to: recipient,
			cc: 'ashonuyak@gmail.com',
			from: 'ashonuyak@gmail.com',
			templateId,
			dynamicTemplateData: { ...body }
		};
		await this.sendGridClient.send(mail);
	}

	async sendVerificationEmail(recipient: string, code: number): Promise<void> {
		console.log('code :>> ', code);

		await this.sendEmailWithTemplate(recipient, 'd-a7a10aae31c546a9a3da740323da2eba', { code });
	}
}
