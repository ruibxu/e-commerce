const Product = require('../models/product-model');

createProduct = async (req, res) => {
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product: newProduct
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        if (product) {
            res.status(200).json({
                success: true,
                product: product
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                },
                category: req.params.category,
                gender: req.params.gender,
                size: req.params.size,
                color:{
                    [Op.contains]: req.params.color
                },
                onSale: req.params.onSale? true : undefined,
            },
            order: [
                ['price', req.params.priceOrder],
                ['createdAt', req.params.newest? 'DESC' : undefined]
            ]
        })
        if (products) {
            res.status(200).json({
                success: true,
                products: products
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        if (product) {
            await product.update(req.body);
            res.status(200).json({
                success: true,
                product: product
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        if (product) {
            await product.destroy();
            res.status(200).json({
                success: true,
                message: "Product deleted"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
