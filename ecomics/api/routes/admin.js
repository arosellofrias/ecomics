const express = require("express");
const router = express.Router();
const {User,Category, Order} = require('../models')
const {Op} = require('sequelize');


router.get("/category",(req,res)=>{
    Category.findAll()
    .then(data=>res.status(200).json(data))
    .catch(e=>e)
})

router.post("/category",(req,res)=>{
    let nombre = req.body.nombre
    Category.findOrCreate(
        {
            where:{
                nombre:nombre
    },
        defaults:{
            nombre:nombre
        }})
    .then(data=>res.status(201).json(data))
    .catch(e=>e)
})

router.delete("/category",(req,res)=>{
    let id = req.body.id
    Category.destroy({where:{id:id}})
    .then(()=>res.sendStatus(202))
    .catch(e=>e)
})

router.put("/category",(req,res)=>{
    let {nombre,id} = req.body
    Category.update({nombre:nombre},
        {
        where:{id:id},
        returning:true,
        plain:true
    })
    .then(data=>res.status(200).send(data[1]))
    .catch(e=>e)
})

router.get("/users/:id", (req,res) => {
    const id = req.params.id
    User.findAll({
        where:{
            id : {[Op.ne]: id}
        }
    })
    .then(data => res.json(data))
})

router.put("/users", (req, res) => {
    const {userId,privilegios} = req.body
    User.update(
       { privilegios :!privilegios},
    {
    where:{
        id: userId
    },
    returning:true,
    plain:true
    })
    .then(data => res.status(201).json(data[1]))
    .catch(e=>e)
})

router.delete("/users/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const {userId} = req.body
    if(id === userId) return (res.status(400).json("NO TE AUTODESTRUYAS, PEDÍ AYUDA"))
    User.destroy({where:{
        id: userId
    }}
    ).then(data => res.status(202).json(data))
})


router.get("/",(req,res)=>{
    Order.findAll()
    .then(data=>res.json(data))
    .catch(e=>e)
})


module.exports = router
