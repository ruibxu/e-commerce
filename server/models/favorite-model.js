const { DataTypes } = require('sequelize');
const sequelize = require('../db')
const product = require('./product-model')

const Favorite = sequelize.define('Favorite', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    products : {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('products').split(';')
        },
        set(val) {
           this.setDataValue('products',val.join(';'));
        },
    }
});

module.exports = Favorite;