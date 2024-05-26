// src/payments/payments.controller.ts
import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
	@Post('/ipn')
	handleIpn(@Req() request: Request, @Res() response: Response) {
		const rawBody = request.body; // Make sure you configure Nest to not parse but provide raw body
		// Verify IPN message with PayPal
		// Process verified IPN messages accordingly
		response.status(HttpStatus.OK).send();
	}
}
