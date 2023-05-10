const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product-controller')

router.post('/', ProductController.createProduct)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)


module.exports = router