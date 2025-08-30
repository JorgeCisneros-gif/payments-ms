import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import express from 'express'
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

//@Post('create-payments-session')
@MessagePattern('create.payments.session')
createPaymentSession( @Payload() paymentSessionDto: PaymentSessionDto ) {
 //return paymentSessionDto
   return this.paymentsService.createPaymentSession(paymentSessionDto);
}

@Get('success')
success(){
  return{
    ok: true,
    message: 'Payment successful'
  }
}

@Get('cancel')
cancel(){
  return{
    ok: false,
    message: 'Payment canceled'
  }
}


@Post('webhook')
async StripeWebhook(@Req() req: express.Request, @Res() res: express.Response) {
  
  return  this.paymentsService.stripeWebhook(req, res)
  
  };

}
