const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart-controller')
const auth = require('../auth/authManager')

router.post('/',auth.verify, cartController.createCart)
router.get('/:id',auth.verify, cartController.getUserCart)
router.put('/:id',auth.verify, cartController.updateCart)

module.exports = router