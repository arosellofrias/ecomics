import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./compStyles/comics.module.css";

const Comics = () => {
    const comics = useSelector((state) => state.comics);
  const comicsByTitle = useSelector((state) => state.comicsByTitle);
  return (
    <div className={styles.comics}>
      {comicsByTitle.length === 0
        ? comics.map((singleComic) => (
            <div id={singleComic.id} className={styles.singleComic}>
              <Link to={`/comics/${singleComic.id}`}>
                <h1 className={styles.h1}>{singleComic.nombre}</h1>
                <img className={styles.img} src={singleComic.imagenUrl} alt={singleComic.nombre} />
                <strong>${singleComic.precio}</strong>
              </Link>
            </div>
          ))
        : comicsByTitle.map((singleComic) => (
            <div id={singleComic.id} className={styles.singleComic}>
              <Link to={`/comics/${singleComic.id}`}>
                <h1 className={styles.h1}>{singleComic.nombre}</h1>
                <img className={styles.img} src={singleComic.imagenUrl} alt={singleComic.nombre} />
                <strong>${singleComic.precio}</strong>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Comics;
