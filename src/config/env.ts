
import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars{
    PORT:number
    STRIPE_SECRET_KEY:string
    STRIPE_WEBHOOK_SECRET:string
}

const envSchema = joi.object({
PORT: joi.number().required(),
STRIPE_SECRET_KEY: joi.string().required(),
STRIPE_WEBHOOK_SECRET: joi.string().required()  
})
.unknown(true);


const { error , value} = envSchema.validate(process.env);

if (error){
    throw new Error(`Config Validator error; ${error.message}`);
}
const EnvVars: EnvVars = value ;

export const envs = {
    port:EnvVars.PORT,
    stripeSecretKey: EnvVars.STRIPE_SECRET_KEY,
    stripeWebhookSecret: EnvVars.STRIPE_WEBHOOK_SECRET
}