const express = require("express");
const router = express.Router();
const {Order,OrderItem,Product,Cart, CartItem}=require("../models")


router.get("/",(req,res)=>{
    Order.findAll()
    .then(data=>res.json(data))
    .catch(e=>e)
})

router.post("/",(req,res)=>{//ESTO NO ESTA TERMINADO
    let {cartId,userId,formaDePago,fecha}=req.body
    Order.create({
        userId:userId,
        formaDePago:formaDePago,
        fecha:fecha
    })
    .then((orderData)=>{
        console.log(orderData,"order creada")
        CartItem.findAll(
            {where:{cartId:cartId}}
        )
        .then(cartData=>{
            console.log(cartData,"...........RESPUESTAAA...............")
            
                // OrderItem.create({
                //     orderId:orderData.id,
                //     productId:cartData[0].productId,
                //     cantidad:cartData[0].cantidad
                // }).then(t=>{
                //     console.log("termino perfecto")
                //     res.send(t)
                // })
                res.send(cartData)
        })
        
    })
    .catch(e=>e)
})


module.exports = router;