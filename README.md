##Comandos ClI stripe


forward a Port --3003 --Public

stripe login
stripe trigger payment_intent.succeeded
stripe listen --forward-to https://5257w2r5-3003.brs.devtunnels.ms/payments/webhook
