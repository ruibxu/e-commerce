const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product-controller')
const auth = require('../auth/authManager')


router.post('/', auth.verifyAdmin, ProductController.createProduct)
router.get('/',  ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.put('/:id', auth.verifyAdmin,  ProductController.updateProduct)
router.delete('/:id', auth.verifyAdmin, ProductController.deleteProduct)


module.exports = router