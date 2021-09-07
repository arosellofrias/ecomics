const Cart = require('./Cart')
const CartItem = require('./CartItem')
const Order = require('./Order')
const OrderItem = require('./OrderItem')
const Product = require('./Product')
const User = require('./User')



User.hasOne(Cart)
Cart.belongsTo(User)

Order.belongsTo(User)
User.hasMany(Order)


//-----Ordenes muchos a muchos Productos---
Order.belongsToMany(Product,{
    through: OrderItem
})
Product.belongsToMany(Order,{
    through: OrderItem
})

//-----Carrito muchos a muchos Productos---
Cart.belongsToMany(Product,{
    through : CartItem
})
Product.belongsToMany(Cart,{
    through : CartItem
})

module.exports = {Cart, CartItem, Order, OrderItem, Product, User}


