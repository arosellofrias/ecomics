const S = require('sequelize')
const db = require('../db')

class Order extends S.Model{}

Order.init({
    fecha: {
        type: S.DATE,
        allowNull: false
    },
    formaDePago: {
        type: S.STRING,
        allowNull: false
    }

},
{
    sequelize: db,
    modelName: "order"
})

module.exports = Order