const express = require("express");
const router = express.Router();
const {Order,OrderItem,Product,Cart, CartItem}=require("../models")


router.get("/",(req,res)=>{
    let {userId,orderId} = req.body
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
                        res.send(t)
                    })
                })
        })
    })
    .catch(e=>e)
})


module.exports = router;