const sequelize = require('../db')
const { DataTypes } = require('sequelize');
const product = require('./product-model')

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    products : {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('products').split(';')
        },
        set(val) {
           this.setDataValue('products',val.join(';'));
        },
    },
    orderTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Order;