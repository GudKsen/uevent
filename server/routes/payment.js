import express from 'express';
import Stripe from 'stripe';

import dotenv from "dotenv";
dotenv.config();

let stripe = Stripe();

const router = express.Router(process.env.SECRET_KEY_STRIPE);

router.post("/api/payment/intents", async (req, res) => {
    try 
    {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
            currency: req.body.currency,
            automatic_payment_methods: {
                enabled: true
            }
        })
        res.json({paymentIntent: paymentIntent.client_secret});
    }
    catch(e)
    {
        res.status(400).json({
            error: e.message
        })
    }
    
})

export default router; 