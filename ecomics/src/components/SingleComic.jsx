import * as React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { singleComicRequest } from "../state/comics";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./compStyles/singleComic.module.css";
import { IconButton } from "@material-ui/core";

const SingleComic = (props) => {
  const dispatch = useDispatch();
  console.log("PROPS", props);
  const params = useParams();
  const paramsId = params.id;
  const [counter, setCounter] = useState(1);

  const descreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const increaseCounter = () => {
    if (counter < singleComic.stock) {
      setCounter(counter + 1);
    }
  };
  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/api/cart/add", {
        cartId: isLoggedIn.id,
        productId: singleComic.id,
        cantidad: counter,
      })
      .then((res) => {
        Swal.fire({
          title: `¡Agregaste ${res.data[0].cantidad}U!`,
          text: `${singleComic.nombre} a tu carrito`,
          icon: "success",
          timer: "2000",
        });
      })
      .catch((e) => {
        Swal.fire({
          title: `Algo no salió bien`,
          text: `intenta más tarde`,
          icon: "error",
          timer: "2000",
          footer: `${e}`,
        });
      });
  };

  useEffect(() => {
    dispatch(singleComicRequest(paramsId));
  }, [paramsId]);
  const singleComic = useSelector((state) => state.singleComic);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  
  const getRandomInt = () => {
    return Math.floor(Math.random() * (6 - 1)) + 1;
  };

  return (
    <div className={styles.container}>
      {Object.keys(singleComic).length ? (
        <>
          <img
            className={`${styles.img} ${styles.column}`}
            src={singleComic.imagenUrl}
            alt={singleComic.nombre}
          />
          
          <div className={styles.column}>
            <h1 className={styles.h1}>{singleComic.nombre}</h1>
            <p className={styles.details}>{singleComic.descripcion}</p>
            <IconButton id={styles.star}>
                {Array(getRandomInt())
                  .fill()
                  .map((_, i) => (
                    <p>&#11088;</p>
                  ))}
              </IconButton>
            <h2 className={styles.h1}>
              Precio:<strong>{singleComic.precio}</strong>
            </h2>
            <h2 className={styles.h1}>
              Disponibles: <strong>{singleComic.stock}</strong>
            </h2>
            <div>
              <button className={styles.h1} onClick={handleSubmit}>
                Agregar al carrito
              </button>
              <button onClick={descreaseCounter}>-</button>
              <button onClick={increaseCounter}>+</button>
              <strong>{counter}</strong>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
};

export default SingleComic;
