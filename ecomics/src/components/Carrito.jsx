import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import axios from "axios";
import styles from "./compStyles/comics.module.css";

export default () => {
  const [carritoProductos, setCarritoProductos] = useState([]);
  const [valores, setValores] = useState([]);
  const [borrados, setBorrados] = useState([])
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const comics = useSelector((state) => state.comics);
  let array = [];
  let solucion = [];

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/cart", { cartId: userId })

      .then((res) => {
        setValores(res.data);
        res.data.map((obj) => {
          array.push(obj.productId);
        });
      })
      .then(() => setCarritoProductos(array));
  }, [borrados]);

  const deleteComicCarrito = (productId)=>{
    if(productId !== undefined)
      axios.delete("http://localhost:3001/api/cart",{data:{
      cartId:valores[0].cartId,
      productId:productId}}
      ).then(data=>{
        Swal.fire({
          title: `Quitaste el producto del carrito`,
          text: `puedes elegir entre muchos más`,
          icon: "info",
          timer: "2000"
        })
        setBorrados(data)})
}  


//carrito comics va a quedar solo con los comics que tengan un id que se encuentre dentro de carritoProductos(arreglo de numeros)

  let carritoComics = comics.filter((comic) =>
    carritoProductos.includes(comic.id)
  );

  for (let i = 0; i < valores.length; i++) {
    solucion.push({
      cantidad: valores[i].cantidad,
      comic: carritoComics[i],
    });
  }

  let final = [];
  function add(accumulator, a) {
    return accumulator + a;
  }
  if (solucion.length != 0) {
    solucion.map((valor) => {
      if (valor.comic != undefined) {
        final.push(valor.cantidad * valor.comic.precio);
      }
    });
  }

  //[30,30,40,50,55,65].reduce(add,0)

  const totalTotal = final.reduce(add, 0);

  return (
    <div>
      {console.log("valoress=>>>", user)}
      <div className={styles.comics}>
      <h3>PRECIO FINAL: {totalTotal}</h3>
      <br></br>
      <h3>DIRECCION:
        <br></br>
        {user.direccion}</h3>
        <button className={styles.h1}>CHECKOUT</button>
        {carritoComics.map((singleCarritoComic, index) => (
          <div key={singleCarritoComic.id} className={styles.singleComic}>
            {console.log("SINGLEcARRITO==>", singleCarritoComic)}
            <h1 className={styles.h1}>{singleCarritoComic.nombre}</h1>
            <img className={styles.img} src={singleCarritoComic.imagenUrl} />
            <button onClick={()=>deleteComicCarrito(singleCarritoComic.id)} >eliminar del carrito</button>
            <p>
              Precio por artículo:
              {final[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
