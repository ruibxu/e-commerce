const Product = require('../models/product-model');
const { Op } = require('sequelize');

createProduct = async (req, res) => {
    console.log(req.body);
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product: newProduct
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message});

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

        const category = req.query.category ? req.query.category.join(';') : undefined;
        console.log(req.query.color);
        const color = req.query.color ? req.query.color.join(';'): undefined;
        const size = req.query.size ? req.query.size.join(';'): undefined;
        const search = req.query.search;
        const sort = req.query.sort;
        const orderCriteria = sort === 'asc'   ? [['price', 'ASC']] : 
                              sort === 'desc'  ? [['price', 'DESC']]:
                            [['createdAt', 'DESC']];


        const pattern = (x) => {return x?`(^|;)${x.replace(';', '\\;')}(;|$)`:undefined;};

        const catCondition = category ? { categories: { [Op.regexp]: pattern(category) } } : {};
        const colorCondition = color ? { color: { [Op.regexp]: pattern(color) } } : {};
        const sizeCondition = size ? { size: { [Op.regexp]: pattern(size) } } : {};
        const searchCondition = search ? { name: { [Op.like]: `%${search}%` } } : {};
        const whereCondition = { ...catCondition, ...colorCondition, ...sizeCondition, ...searchCondition };
        const products = await Product.findAll({
            where: whereCondition,
            order: orderCriteria,
        });
        
        if (products.length === 0) {
            res.status(404).json({
                success: false,
                message: "No products found"
            })
        }

        
        res.status(200).json({
            success: true,
            products: products
        })

    } catch (error) {
        console.log(error);
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
