const express = require("express");
const router = express.Router();
const {User} = require('../models')
const {Op} = require('sequelize')

router.get("/:id", (req,res) => {
    const id = req.params.id
    User.findAll({
        where:{
            id : {[Op.ne]: id}
        }
    })
    .then(data => res.json(data))
})

router.put("/:id", (req, res) => {
    const {userId} = req.body
    User.update(
       { privilegios : true},
    {
    where:{
        id: userId
    }
    })
    .then(data => res.status(201).json(data))
})

router.delete("/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const {userId} = req.body
    if(id === userId) return (res.status(400).json("NO TE AUTODESTRUYAS, PEDÍ AYUDA"))
    User.destroy({where:{
        id: userId
    }}
    ).then(data => res.status(202).json(data))
})

module.exports = router
