import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./compStyles/comics.module.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { reviewRequest } from "../state/review";

const Comics = () => {
  const dispatch = useDispatch();
  const comics = useSelector((state) => state.comics);
  const comicsByTitle = useSelector((state) => state.comicsByTitle);

  return (
    <div className={styles.comics}>
      {comicsByTitle.length === 0
        ? comics.map((singleComic) => {
            const posts = singleComic.ratings.length;
            const totalStars = singleComic.ratings.map((rate) => rate);
            const suma = totalStars.reduce((a, b) => a + b, 0);
            const total = suma / posts;
            return (
              <div
                id={singleComic.id}
                className={styles.singleComic}
                key={singleComic.id}
              >
                <Link to={`/comics/${singleComic.id}`}>
                  <h1 className={styles.h1}>{singleComic.nombre}</h1>
                  <img
                    className={styles.img}
                    src={singleComic.imagenUrl}
                    alt={singleComic.nombre}
                  />
                  <strong>${singleComic.precio}</strong>
                </Link>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating"
                    value={total}
                    precision={0.1}
                    readOnly
                  />
                </Stack>
              </div>
            );
          })
        : comicsByTitle.map((singleComic) => (
            <div id={singleComic.id} className={styles.singleComic}>
              <Link to={`/comics/${singleComic.id}`}>
                <h1 className={styles.h1}>{singleComic.nombre}</h1>
                <img
                  className={styles.img}
                  src={singleComic.imagenUrl}
                  alt={singleComic.nombre}
                />
                <strong>${singleComic.precio}</strong>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Comics;
