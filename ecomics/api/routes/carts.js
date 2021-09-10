const express = require("express");
const router = express.Router();
const {Cart,User, CartItem,Product} = require("../models")

router.post("/",(req,res)=>{
    User.findByPk(2)
    .then(user=>{
        console.log(user.id,"eeeeeeeee")
        Cart.create({userId:user.id})
            .then(data=>{
        console.log("creado exitosamente")
        res.send(data)
    })
    })
})

router.post("/add",(req,res)=>{
    let {cartId, productId,cantidad} = req.body
    Cart.findByPk(cartId)
    .then(carrito=>{
        Product.findByPk(productId)
        .then(prod=>{
            CartItem.create({
                cantidad:cantidad,
                cartId:carrito.id,
                productId: prod.id
            }).then(()=>{
                res.send()
            })
        })
    })
})

router.put("/",(req,res)=>{
    let {cartId, productId,cantidad} = req.body
    Cart.findByPk(cartId)
    .then(carrito=>{
        Product.findByPk(productId)
        .then(prod=>{
            CartItem.update({cantidad:cantidad},
                {where:{
                    cartId:carrito.id,
                    productId:prod.id
                },
                returning:true,
                plain:true
            })
            .then(data=>{
                console.log(data)
                res.json(data[1])
            })
        })
    })
.catch(e=>e)
})

router.delete("/",(req,res)=>{
    let {cartId, productId} = req.body
    Cart.findByPk(cartId)
    .then(carrito=>{
        Product.findByPk(productId)
        .then(prod=>{
            CartItem.destroy(
                {where:{
                    cartId:carrito.id,
                    productId:prod.id
                },
            })
            .then(data=>{
                console.log(data)
                res.json(data)
            })
        })
    })
.catch(e=>e)
})

module.exports = router;