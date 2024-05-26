import { Module } from '@nestjs/common';
import { SendGridClient } from './clients/sendgrid-client';
import { EmailService } from './email.service';

@Module({
	providers: [EmailService, SendGridClient],
  exports: [EmailService]
})
export class EmailModule {}
