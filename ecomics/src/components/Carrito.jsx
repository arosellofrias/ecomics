import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./compStyles/carrito.module.css";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Checkout from "./Checkout"
const emailjs = require("emailjs-com");
emailjs.init("user_swQa08yjju8mCZ64zEuPO");

export default () => {
  // const [cantItem,setCantItem]=useState(1)
  //
  const [carritoProductos, setCarritoProductos] = useState([]);//productId
  const [valores, setValores] = useState([]);
  const [borrados, setBorrados] = useState([]);
  const [pago, setPago] = useState("");
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const userEmail = user.email;
  const comics = useSelector((state) => state.comics);
  let array = [];
  let solucion = [];
  let valFiltrados

  const f = new Date();
  const date = f.getMonth() + "/" + f.getDate() + "/" + f.getFullYear();

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/cart", { cartId: userId })
      .then((res) => {
        res.data.sort((a,b)=>a.productId-b.productId)
        console.log("renderiza")
        
        setValores(res.data);
        res.data.map((obj) => {
         
          array.push(obj.productId);
        });
      })
      .then(() => setCarritoProductos(array));
  }, [borrados]);

  const deleteComicCarrito = (productId,index) => {
    if (productId !== undefined)
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Quitarás el producto del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borralo",
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Borrado", "El producto fue eliminado", "success");
          }
        })
        .then((data) => {
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
              console.log("renderizaDELETE")
              setBorrados(data);
            });
        });
  };

  const enviarMail = (solucion, userEmail) => {
    const solucionMapeado = solucion.map((sol, i) => {
      return `${sol.cantidad} unidad/es del comic ${sol.comic.nombre}. a $ ${final[i]}. ||`;
    });
    let templateParams = {
      from_name: "E-Comics",
      message: `Gracias por comprar ${solucionMapeado} Precio final: $ ${totalTotal}`,
      maill: `${userEmail}`,
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
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/order", {
        cartId: valores[0].cartId,
        userId: userId,
        formaDePago: pago,
        fecha: `${date}`,
      })
      .then((res) => {
        axios
          .delete("http://localhost:3001/api/cart/checkout", {
            data: { cartId: valores[0].cartId },
          })
          .then((res) => {
            /* enviarMail(solucion, userEmail); */ 
            setBorrados(res);
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
  const totalTotal = final.reduce(add, 0);

const handleCantidad = (bool,prodId)=>{
  let data={
    bool:bool,
    productId:prodId,
    cartId:1
  }
  axios.put("http://localhost:3001/api/cart/sub",data)
    .then(()=>{
      setBorrados([])
    })

}
  return (
    <div>
      <div className={styles.cartItems}>
      
      <h3>DIRECCION DE ENVIO: <br></br> {user.direccion}</h3>
        
        <br></br>
       
        <h3>PRECIO FINAL: <br></br> {totalTotal}</h3>
       
        {valores.length > 0 ? (
          <form onSubmit={(e) => hanldeSubmit(e)}>
            <input
              className={styles.inputC}
              name="pago"
              placeholder="Introduce forma de pago"
              value={pago}
              onChange={(e) => {
                handlePago(e);
              }}
            ></input><br></br>
            <button type="submit">CHECKOUT</button>
          </form>
        ) : (
          <h1>Carrito Vacío</h1>
        )}
      </div>
          <br/>
          <Divider/>

      <div className={styles.cartComics}>
        {carritoComics.map((singleCarritoComic, index) => (
          <div key={singleCarritoComic.id} className={styles.singleComic}>
            <h1 className={styles.h1}>{singleCarritoComic.nombre}</h1>
            <img className={styles.img} src={singleCarritoComic.imagenUrl} />
            <div >

              {valores.filter(valor=>valor.productId===singleCarritoComic.id).length?(valores.filter(valor=>valor.productId===singleCarritoComic.id)[0].cantidad>1?<button onClick={()=>handleCantidad(false,singleCarritoComic.id)}>-</button>:null):null}
              {
               solucion.filter(sarasa=>sarasa.comic.id===singleCarritoComic.id).length?solucion.filter(sarasa=>sarasa.comic.id===singleCarritoComic.id)[0].cantidad:null
              }
              {valores.filter(valor=>valor.productId===singleCarritoComic.id).length?(valores.filter(valor=>valor.productId===singleCarritoComic.id)[0].cantidad<singleCarritoComic.stock?<button onClick={()=>handleCantidad(true,singleCarritoComic.id)}>+</button>:null):null}


            </div>
            <br />
            <button
              className={styles.btns}
              onClick={() => deleteComicCarrito(singleCarritoComic.id,index)}
            >
              eliminar del carrito
            </button>
            <p className={styles.h1}>
              Precio por artículo:
              {final[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
