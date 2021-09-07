const S = require('sequelize')
const db = require('../db')

class CartItem extends S.Model{}

CartItem.init({
    cantidad: {
        type: S.INTEGER,
        allowNull: false,
    }

},{
    sequelize: db,
    modelName: 'cartItem'
})

module.exports = CartItem