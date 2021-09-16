import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./compStyles/comics.module.css";
import { IconButton } from "@material-ui/core";

const Comics = () => {
  const comics = useSelector((state) => state.comics);
  const comicsByTitle = useSelector((state) => state.comicsByTitle);
  const getRandomInt = () => {
    return Math.floor(Math.random() * (6 - 1)) + 1;
  };

  return (
    <div className={styles.comics}>
      {comicsByTitle.length === 0
        ? comics.map((singleComic) => (
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
              <IconButton id={styles.star}>
                {Array(getRandomInt())
                  .fill()
                  .map((_, i) => (
                    <p>&#11088;</p>
                  ))}
              </IconButton>
            </div>
          ))
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
