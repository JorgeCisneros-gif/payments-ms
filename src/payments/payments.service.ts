import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';
import {Request, Response} from 'express'

@Injectable()
export class PaymentsService {

private readonly stripe = new Stripe(envs.stripeSecretKey);

async createPaymentSession(paymentSessionDto: PaymentSessionDto) {

const { currency, items ,orderId} = paymentSessionDto;
const line_items = items.map(item => ({
  price_data: {
    currency: currency,
    product_data: {
      name: item.name,
    },
    unit_amount: Math.round(item.price * 100),
  },
  quantity: item.quantity,
}));

  const session = await this.stripe.checkout.sessions.create({
    //Colocalr  aqui ID de mi orden
    payment_intent_data: {

      metadata:{
        orderId: orderId
      }
    },
    line_items: line_items,
    mode: 'payment',
    success_url: 'http://localhost:3003/payments/success',
    cancel_url: 'http://localhost:3003/payments/cancel',
  });

  return session;
}




async stripeWebhook( req: Request, res: Response) {
const sig = req.headers['stripe-signature'];

if (typeof sig !== 'string') {
  console.log('Webhook signature is missing or invalid');
  return res.status(400).send('Webhook signature is missing or invalid');
}

let event: Stripe.Event;
//console.log('➡️ Webhook headers:', req.headers);
//console.log('➡️ Raw body type:', typeof req.body, Buffer.isBuffer(req.body));
try {
 // event = this.stripe.webhooks.constructEvent(req['rawBody'], sig, envs.stripeWebhookSecret);
 event = this.stripe.webhooks.constructEvent(
  req.body, // ahora sí tienes el raw buffer
  sig,
  envs.stripeWebhookSecret,
);
} catch (err) {
  //console.log(`Webhook signature verification failed: ${err.message}`);
  return res.status(400).send(`Webhook error: ${err.message}`);
}
//console.log('Received Stripe event:', event.type); 
switch (event.type) {
  case 'charge.succeeded':
    const chargeSuccesded = event.data.object;
    console.log({
      metadata: chargeSuccesded.metadata
    })
    break;
  default:
    //console.log(`Unhandled event type: ${event.type}`);
}

return res.status(200).json({sig})  
}





}
