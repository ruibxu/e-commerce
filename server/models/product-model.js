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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categories: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('categories').split(';')
        },
        set(categories) {
           this.setDataValue('categories',categories.join(';'));
        },
    },
    size: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('size').split(';')
        },
        set(size) {
           this.setDataValue('size',size.join(';'));
        },
    },
    color: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('color').split(';')
        },
        set(color) {
           this.setDataValue('color',color.join(';'));
        },
    },
    inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Product;