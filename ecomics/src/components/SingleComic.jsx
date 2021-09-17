import * as React from "react";
import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { singleComicRequest } from "../state/comics";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./compStyles/singleComic.module.css";
import Reviews from "./Reviews";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { reviewRequest } from "../state/review";

const SingleComic = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const paramsId = params.id;
  const [counter, setCounter] = useState(1);
  const [rating, setRating] = useState(0);

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
    dispatch(reviewRequest(paramsId)).then((res) => {
      const allReviewsSingle = res.payload;
      const posts = allReviewsSingle.length;
      const totalStars = allReviewsSingle.map((review) => review.rating);
      const suma = totalStars.reduce((a, b) => a + b, 0);
      const total = suma / posts;
      setRating(total);
    });
  }, [paramsId, rating]);

  const singleComic = useSelector((state) => state.singleComic);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const soldOut = "https://www.meme-arsenal.com/memes/583a3b2201a13798ea156eaea424ab61.jpg"

  return (
    <div className={styles.todo}>
      {Object.keys(singleComic).length ? (
        <>
          <div className={styles.container}>
          <img
            className={`${styles.img} ${styles.column}`}
            src={singleComic.imagenUrl}
            alt={singleComic.nombre}
          />

          <div className={styles.column}>
            <h1 className={styles.h1}>{singleComic.nombre}</h1>
            <p className={styles.details}>{singleComic.descripcion}</p>
            <Stack spacing={1}>
              <Rating
                name="half-rating"
                value={rating}
                precision={0.1}
                readOnly
              />
            </Stack>
            <h2 className={styles.h1}>
              Precio:<strong>{singleComic.precio}</strong>
            </h2>
            <h2 className={styles.h1}>
              Disponibles: <strong>{singleComic.stock}</strong>
            </h2>

            {singleComic.stock===0?(<img className={styles.imgout} src={soldOut}></img>):(<div>
              <button className={styles.h1} onClick={handleSubmit}>
                Agregar al carrito
              </button>
              <button onClick={descreaseCounter}>-</button>
              <button onClick={increaseCounter}>+</button>
              <strong>{counter}</strong>
            </div>)}
            
            <Reviews/>

            <div>
            <div>
              <button 
              className={styles.btn}
              onClick={descreaseCounter}>-</button>
              <button 
              className={styles.btn}
              onClick={increaseCounter}>+</button>
              <strong>{counter}</strong>
              </div>
              <button className={styles.h3} onClick={handleSubmit}>
                Agregar al carrito
              </button>
              
              
            </div>
          </div>

          </div>
        </>
        
      ) : (
        <h1>Loading..</h1>
      )}
      <div>
        <Reviews/>
        </div>
    </div>
  );
};

export default SingleComic;