const express = require("express");
const { Op } = require("sequelize");

const router = express.Router();
const {Product,Category,Review} = require("../models")

router.get("/",(req,res)=>{
    Product.findAll()
    .then(async data=>{
        return await Promise.all(data.map(async prod=>(
            await Review.findAll(
                {
                    where: {
                      productId: {
                        [Op.eq]: prod.id
                      }
                    }
                  }
            ).then(revs=>{
                let arreglo = revs.map(rev=>rev.rating)
                prod.dataValues["ratings"]=arreglo
                return prod
            })
        ))
         )
    }).then( (d)=>{
        res.send(d)
    })
})


router.get("/search/:titulo", (req, res) =>{
    const titulo = req.params.titulo
    Product.findAll({where : {nombre :{
        [Op.iLike] : `%${titulo}%`}
    }})
    .then(async data=>{
        return await Promise.all(data.map(async prod=>(
            await Review.findAll(
                {
                    where: {
                      productId: {
                        [Op.eq]: prod.id
                      }
                    }
                  }
            ).then(revs=>{
                let arreglo = revs.map(rev=>rev.rating)
                prod.dataValues["ratings"]=arreglo
                return prod
            })
        ))
         )
    }).then( (d)=>{
        res.send(d)
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
    let format = req.body.formato
    
    Category.findOne({ where: { nombre: format } })
        .then((data)=>{
            const total = {...req.body,categoryId:data.dataValues.id}//al req.body le agrego la key categoryId
            console.log(total)
            Product.create(total)
                 .then(data=>{
                res.json(data)
                })
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