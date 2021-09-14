import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./compStyles/comics.module.css";

export default () => {
  const [carritoProductos, setCarritoProductos] = useState([]);
  const [valores, setValores] = useState([]);
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
  }, []);

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

  return (
    <div>
      <div className={styles.comics}>
        {carritoComics.map((singleCarritoComic, index) => (
          <div key={singleCarritoComic.id} className={styles.singleComic}>
            <h1 className={styles.h1}>{singleCarritoComic.nombre}</h1>
            <img className={styles.img} src={singleCarritoComic.imagenUrl} />
            <p>
              Precio por artículo:
              {singleCarritoComic.precio * solucion[index].cantidad}
            </p>
          </div>
        ))}
      </div>
      <h1>PRECIO FINAL: {totalTotal}</h1>
    </div>
  );
};
