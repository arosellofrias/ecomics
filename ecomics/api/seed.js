const prods = require("./productos.json")

const {Cart, CartItem, Order, OrderItem, Product, User} = require("./models")

const seedProd = () =>{
    let contador = 0
    prods.map(producto=>{
        Product.create({
            nombre:producto.titulo,
            formato:producto.formato,
            imagenUrl:producto.imagen,
            precio:producto.precio,
            paginas:producto.paginas,
            stock:producto.stock,
            descripcion:producto.descripcion,
        }).then(data=>{
            contador+=1
            console.log(`Seed con '${contador}' productos`)
        })

    })
}
seedProd()