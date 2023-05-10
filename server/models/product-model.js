const { DataTypes } = require('sequelize');
const sequelize = require('../db')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: 'All',
    },
    gender: {
        type: DataTypes.STRING,
        defaultValue: 'All',
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sizes: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
      },
    color: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
    },
    onSale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Product;