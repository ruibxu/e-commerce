const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post('/payment',  async (req, res) => {
    stripe.charges.create({
        source: req.params.tokenId,
        amount: req.params.amount,
        currency: 'usd',
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr)
        } else {
            res.status(200).json(stripeRes)
        }
    }
    )
});

module.exports = router
