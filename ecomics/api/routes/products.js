const express = require("express");
const router = express.Router();
const {Product} = require("../models")


router.get("/",(req,res)=>{
    Product.findAll()
    .then(data=>{
        // console.log(data)
        res.json(data)
    })
})

router.get("/:id",(req,res)=>{
    let id = req.params.id
    Product.findByPk(id)
    .then(data=>{
        // console.log(data)
        res.json(data)
    })
})

router.post("/",(req,res)=>{
    
    Product.create(req.body)
    .then(data=>{
        // console.log(data)
        res.json(data)
    })
})
router.put("/:id",(req,res)=>{
    let id = req.params.id

    Product.update(req.body,
        {where:{id:id},
        returning:true,
        plain:true
    })
    .then(data=>{
        // console.log(data)
        res.json(data[1])
    })
})
router.put("/:id",(req,res)=>{
    let id = req.params.id

    Product.update(req.body,
        {where:{id:id},
        returning:true,
        plain:true
    })
    .then(data=>{
        // console.log(data)
        res.json(data[1])
    })
})
router.delete("/:id",(req,res)=>{
   let id = req.params.id
    Product.destroy({where:{id:id}})
    .then(data=>{
        // console.log(data)
        res.json(data)
    })
})



module.exports = router;