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
        const qNew = req.query.new;
        const qCategory = req.query.category;
        let products;
        if(qNew){
            products = await Product.findAll({
                order: [['createdAt', 'DESC']],
                limit: 1
            });
        }
        else if(qCategory){
            products = await Product.findAll({
                where: {
                  categories: {
                    [Op.contains]: [qCategory],
                  },
                },
            });
        }
        else{
            products = await Product.findAll();
        }

    
        res.status(200).json({
            success: true,
            products: products
        })

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
