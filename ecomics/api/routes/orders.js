const express = require("express");
const router = express.Router();
const {Order,OrderItem,Product,Cart, CartItem}=require("../models")
const S = require("sequelize")


router.get("/",(req,res)=>{
    console.log("reqBodyy==>", req.query)
    let {userId,orderId} = req.query
    if(userId)
    {Order.findAll({//Trae todas las ordenes de un userId
        where: {
          userId:userId
        }
    })
    .then(data=>res.json(data))
    .catch(e=>e)}
    else {
        OrderItem.findAll({//Trae detalles de una orderId
                    where: {
                      orderId:orderId
                    }
                })
                .then(data=>res.json(data))
                .catch(e=>e)
    }
})




router.post("/",(req,res)=>{//Primero esta, desp checkout
    let {cartId,userId,formaDePago,fecha}=req.body
    console.log("REQBODY==>", req.body)
    Order.create({
        userId:userId,
        formaDePago:formaDePago,
        fecha:fecha
    })
    .then((orderData)=>{
        CartItem.findAll(
            {where:{cartId:cartId}}
        )
        .then(cartData=>{
                cartData.map(cart =>{
                    OrderItem.create({
                        orderId:orderData.id,
                        productId:cart.productId,
                        cantidad:cart.cantidad
                    }).then(t=>{
                        Product.update({stock:S.literal(`stock - ${cart.cantidad}`)},
                        {where:{id:cart.productId}})})
                })
                res.send("cart-data")
        })
        
    })
    .catch(e=>e)
})


module.exports = router;