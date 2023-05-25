const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const orderController = require('../controllers/order-controller')

router.post('/',auth.verify, orderController.createOrder)
router.get('/:id',auth.verify, orderController.getUserOrder)
router.put('/:id',auth.verify, orderController.updateOrder)
router.delete('/:id',auth.verify, orderController.deleteOrder)

module.exports = router