
import 'dotenv/config';
import * as joi from 'joi';
import Stripe from 'stripe';


interface EnvVars{
    PORT:number
    STRIPE_SECRET_KEY:string
    STRIPE_WEBHOOK_SECRET:string
    STRIP_SUCCESS_URL:string
    STRIP_CANCEL_URL:string
    NATS_SERVERS: string[]
}

const envSchema = joi.object({
PORT: joi.number().required(),
STRIPE_SECRET_KEY: joi.string().required(),
STRIPE_WEBHOOK_SECRET: joi.string().required(),
STRIP_SUCCESS_URL: joi.string().required(),  
STRIP_CANCEL_URL: joi.string().required(),
NATS_SERVERS: joi.array().items(joi.string()).required()
})
.unknown(true);


const { error , value} = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')

});


if (error){
    throw new Error(`Config Validator error; ${error.message}`);
}
const EnvVars: EnvVars = value ;

export const envs = {
    port:EnvVars.PORT,
    stripeSecretKey: EnvVars.STRIPE_SECRET_KEY,
    stripeWebhookSecret: EnvVars.STRIPE_WEBHOOK_SECRET,
    stripSuccessUrl: EnvVars.STRIP_SUCCESS_URL,
    stripCancelUrl: EnvVars.STRIP_CANCEL_URL,
    natsServers: EnvVars.NATS_SERVERS,
}