const express = require("express");
const router = express.Router();
const {Cart,User, CartItem,Product} = require("../models")
const S = require("sequelize")



router.post("/",(req,res)=>{
    let id = req.body.cartId
    CartItem.findAll(
        {
            where: {
              cartId:id
            }
        }
    ).then(data=>{
        console.log(data)
        res.send(data)
    })
})


router.post("/add/",(req,res)=>{
    let {cartId, productId, cantidad} = req.body

    Cart.findByPk(cartId)
    .then(carrito=>{
        Product.findByPk(productId)
        .then(prod=>{
            CartItem.findOrCreate({
                where:{
                    productId : prod.id
                },
                defaults : {cantidad:cantidad,
                cartId:carrito.id,
                productId: prod.id
                }
            }).then((data)=>{
                res.send(data)
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
                /* console.log(data) */
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

router.delete("/checkout", (req, res) => {
    let {cartId} = req.body
    Cart.findByPk(cartId)
    .then(cart => {
        CartItem.destroy(
            {where:{
                cartId : cartId
            }})
    }).then(data => res.json(data))
}
)

router.put("/sub",(req,res)=>{//true:+1 false:-1
    let {bool,productId,cartId}=req.body
    let buleano = bool?1:-1
    CartItem.update({cantidad:S.literal(`cantidad + ${buleano}`)}
        ,{where:{
        productId:productId,
        cartId:cartId
        },
        returning:true,
        plain:true})
    .then((data)=>res.send(data[1]))
})

module.exports = router;