const prods = require("./productos.json")

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
                    paginas:producto.paginas,
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

async function seedearTODO(){
    const promesa = await seedCategories(categorias)
    return await Promise.all(promesa)
    
}


seedearTODO().then(()=>seedProd())
            .catch(e=>console.log(e))

