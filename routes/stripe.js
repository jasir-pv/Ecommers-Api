import express, { Router } from "express"
import Stripe from "stripe"

const router = Router()
const Stripe = process.env.STRIPE_KEY


router.post("/payment", (req,res)=>{
    Stripe.ChargesResource.create({
    sourse:req.body.tokenId,
    amount: req.body.amount,
    currency:"usd",
}),(stripeErr, stripeRes)=>{
    if (stripeErr){
        res.status(500).json(stripeErr)
    }else{
        res.status(200).json(stripeRes)
    }
}
})