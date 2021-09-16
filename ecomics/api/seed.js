const prods = require("./productos.json")
const users = require("./usuarios.json")
const axios = require("axios")

const {Cart, CartItem, Order, OrderItem, Product, User, Category} = require("./models")


const categorias=["Comic","Manga"]

  function seedCategories (arrCategories){  
           return arrCategories.map(async(name)=>{
             await Category.create({nombre:name})
              .then(()=>console.log(`Categoria '${name}' creada`))
  })    
}

function seedProd  (){  
    let contador = 0
      return prods.map((producto)=>{
         Category.findOne({ where: { nombre: producto.formato } })
            .then(data=>{
                //////////
                Product.create({
                    nombre:producto.titulo,
                    formato:producto.formato,
                    imagenUrl:producto.imagen,
                    precio:producto.precio,
                    agno:producto.agno,
                    stock:producto.stock,
                    descripcion:producto.descripcion,
                    categoryId:data.dataValues.id
                }).then(()=>{
                    contador+=1
                    console.log(`Seed con '${contador}' productos`)
                })
                ////////
            })
    })  
}

function seedUsers(){
    let contador = 0
    users.map(user=>
        {
        axios.post("http://localhost:3001/api/user/register", user)
            .then((r) =>{
                contador+=1
                console.log(`Usuario registrado (${contador})${user.privilegios?'admin':'.'}` )
                r.data
            })
            .catch(e=>e)
        })
}

async function seedearTODO(){
    const promesa = await seedCategories(categorias)
    return await Promise.all(promesa)
    
}


seedearTODO().then(()=>{

    seedProd()
    seedUsers()
})
            .catch(e=>console.log(e))

