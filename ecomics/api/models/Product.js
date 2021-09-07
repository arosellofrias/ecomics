const S = require('sequelize')
const db = require('../db')

class Product extends S.Model{}

Product.init({
    nombre : {
        type: S.STRING,
        allowNull: false,
    },
    precio: {
        type: S.FLOAT,
        allowNull: false
    },
    stock:{
        type: S.STRING,
        allowNull: false
    }

},
{
    sequelize: db,
    modelName: "product"
})

module.exports = Product