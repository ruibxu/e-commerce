
const Cart = require('../models/cart-model');

createCart = async (req, res) => {
    try{
        const newCart = await Cart.create(req.body);
        res.status(201).json({
            success: true,
            cart: newCart
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

getUserCart = async (req, res) => {     
    try {
        const userCart = await Cart.findOne({where: {userId: req.params.id}});
        res.status(200).json({
            success: true,
            cart: userCart
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


updateCart = async (req, res) => {
    try{
        const updatedCart = await Cart.update(req.body, {where: {userId: req.params.id}});
        res.status(200).json({
            success: true,
            cart: updatedCart
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createCart,
    getUserCart,
    updateCart
}
