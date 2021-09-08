const S = require('sequelize')
const db = require('../db')

class Product extends S.Model{}

Product.init({
    nombre : {
        type: S.STRING,
        allowNull: false,
    },
    formato : {
        type: S.STRING,
        allowNull: false,
    },
    imagenUrl : {
        type: S.STRING,
        allowNull: false,
    },
    precio: {
        type: S.FLOAT,
        allowNull: false
    },
    paginas : {
        type : S.INTEGER,
        allowNull: false,
    },
    stock:{
        type: S.STRING,
        allowNull: false
    },
    descripcion: {
        type: S.TEXT,
        allowNull: true
    }


},
{
    sequelize: db,
    modelName: "product"
})

module.exports = Product