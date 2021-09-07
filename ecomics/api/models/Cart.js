const S = require('sequelize')
const db = require('../db')

class Cart extends S.Model{}

Cart.init({
    
},
{
    sequelize: db,
    modelName: "cart"
})

module.exports = Cart