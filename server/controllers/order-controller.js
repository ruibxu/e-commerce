
const Order = require('../models/order-model');
const { updateCart } = require('./cart-controller');

createOrder = async (req, res) => {
    try{
        const newOrder = await Order.create(req.body);
        res.status(201).json({
            success: true,
            order: newOrder
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

getUserOrder = async (req, res) => {
    try {
        const userOrder = await Order.findOne({where: {userId: req.params.id}});
        res.status(200).json({
            success: true,
            order: userOrder
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

updateOrder = async (req, res) => { 
    try{
        const updatedOrder = await Order.update(req.body, {where: {userId: req.params.id}});
        res.status(200).json({
            success: true,
            order: updatedOrder
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

deleteOrder = async (req, res) => {
    try{
        const deletedOrder = await Order.destroy({where: {userId: req.params.id}});
        res.status(200).json({
            success: true,
            order: deletedOrder
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    getUserOrder,
    updateOrder,
    deleteOrder
}
