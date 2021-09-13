const express = require("express");
const router = express.Router();
const {Category, Product} = require('../models') 
const {Op} = require('sequelize')


router.get("/:category", (req, res)=>{
    let categoria = req.params.category
    //Uppercase 1° let
    const cap = (s) => (s[0].toUpperCase() + s.slice(1))

    categoria = cap(categoria)
    Product.findAll({
        where : {
            formato : categoria
        }
    }).then(data => res.json(data))
})

module.exports = router