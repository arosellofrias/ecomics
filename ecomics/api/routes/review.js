const express = require("express");
const router = express.Router();
const {User,Product,Review} = require('../models')

router.get("/",(req,res)=>{
    let {productId} = req.query
    Review.findAll(
        {where:{
            productId:productId
        }}
    ).then(data=>{
        console.log(data)
        res.json(data)
    })
})

router.post("/",(req,res)=>{
    let {rating,comentario,userId,productId}=req.body
    Review.findOne(
        {where:{
            userId:userId,
            productId:productId
        }}
    ).then(data=>{
        if(data)
        res.send("Ya has calificado")
        else
        Review.create(
            {rating:rating,
            comentario:comentario,
            userId:userId,
            productId:productId
            }
        ).then(data=>res.json(data))
    })
})

router.delete("/",(req,res)=>{
    let {productId,userId} = req.body
    Review.destroy(
        {where:{
            userId:userId,
            productId:productId
        }}
    ).then(()=>res.send("Review eliminada"))
})



module.exports= router



