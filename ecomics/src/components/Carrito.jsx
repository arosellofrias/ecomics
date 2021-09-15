import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./compStyles/comics.module.css";
const emailjs = require("emailjs-com");
emailjs.init("user_swQa08yjju8mCZ64zEuPO");

export default () => {
  const [carritoProductos, setCarritoProductos] = useState([]);
  const [valores, setValores] = useState([]);
  const [borrados, setBorrados] = useState([]);
  const [pago, setPago] = useState("");
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const userEmail= user.email
  const comics = useSelector((state) => state.comics);
  let array = [];
  let solucion = [];
  const f = new Date();
  const date = f.getMonth() + "/" + f.getDate() + "/" + f.getFullYear();

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

  const deleteComicCarrito = (productId) => {
    if (productId !== undefined)
      axios
        .delete("http://localhost:3001/api/cart", {
          data: {
            cartId: valores[0].cartId,
            productId: productId,
          },
        })
        .then((data) => {
          Swal.fire({
            title: `Quitaste el producto del carrito`,
            text: `puedes elegir entre muchos más`,
            icon: "info",
            timer: "2000",
          });
          setBorrados(data);
        });
  };

   const enviarMail = (solucion,userEmail) => {
    console.log("llamada.............................");
    const solucionMapeado = solucion.map(sol=>{
       return `compraste ${sol.cantidad} producto/s del comic ${sol.comic.nombre}.
       a`
      }) 
    let templateParams = {
      from_name: "E-Comics",
      message:`${solucionMapeado}\nPrecio total: $ ${totalTotal}`,
      maill: "manfiolautaro@gmail.com",
    };
    emailjs.send("service_svrz8cv", "template_6df7wxo", templateParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  };  
  const hanldeSubmit = (e) => {
    console.log("se activa submit====>");
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/order", {
        cartId: valores[0].cartId,
        userId: userId,
        formaDePago: pago,
        fecha: `${date}`,
      })
      .then((res) => {
        console.log(" QUE ME LLEGA??=>", res.data);
        axios
          .delete("http://localhost:3001/api/cart/checkout", {
            data: { cartId: valores[0].cartId }
          })
          .then((res) => {
            enviarMail(solucion,userEmail) 
            setBorrados(res)

          });
      });
  };
  const handlePago = (e) => {
    e.preventDefault();
    setPago(e.target.value);
  };

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
      {console.log("carritoComics", solucion)}
      <div className={styles.comics}>
        <h3>PRECIO FINAL: {totalTotal}</h3>
        <br></br>
        <h3>
          DIRECCION:
          <br></br>
          {user.direccion}
        </h3>
        {valores.length > 0 ? (
          <form onSubmit={(e) => hanldeSubmit(e)}>
            <input
              name="pago"
              placeholder="Introduce forma de pago"
              value={pago}
              onChange={(e) => {
                handlePago(e);
              }}
            ></input>
            <button type="submit" className={styles.h1}>
              CHECKOUT
            </button>
          </form>
        ) : (
          <h1>Carrito Vacío</h1>
        )}
        {carritoComics.map((singleCarritoComic, index) => (
          <div key={singleCarritoComic.id} className={styles.singleComic}>
            <h1 className={styles.h1}>{singleCarritoComic.nombre}</h1>
            <img className={styles.img} src={singleCarritoComic.imagenUrl} />
            <button onClick={() => deleteComicCarrito(singleCarritoComic.id)}>
              eliminar del carrito
            </button>
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
