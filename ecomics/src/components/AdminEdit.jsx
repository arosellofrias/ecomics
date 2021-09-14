import * as React from "react";
import Link, { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { singleComicRequest } from "../state/comics";
import { useState } from "react";
import axios from "axios";
import styles from "./compStyles/editSingleComic.module.css";
import "./compStyles/editComic.css";

export default (props) => {
  const dispatch = useDispatch();
  console.log("PROPS", props);
  const params = useParams();
  const paramsId = params.id;

  const singleComic = useSelector((state) => state.singleComic);

  console.log("NOMBRE",singleComic.nombre)
  const [edit, setEdit] = useState({
    nombre: singleComic.nombre,
    imagen: singleComic.nombre,
    precio: singleComic.nombre,
    stock: singleComic.nombre,
    descripcion: singleComic.nombre,
  });

  const handleChange = (e) => {
    console.log("QUELLEGA",e.target)
    e.preventDefault();
    const { name, value } = e.target;
    setEdit((edit) => ({ ...edit, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("EDITANDO", edit);
  };

  useEffect(() => {
    dispatch(singleComicRequest(paramsId));
  }, [paramsId]);

  console.log("SINGLE_COMIC", singleComic);
console.log("EDIT",edit)
  return (
    <div className={styles.container}>
      <div className="login">
        <form
          className="login_form"
          name="form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label>Titulo</label>
          <input
            type="text"
            name="nombre"
            value={edit.nombre}
            onChange={handleChange}
            className="form-control"
          ></input>

          <label>Descripcion</label>
          <textarea
            type="text"
            name="titulo"
            value={singleComic.descripcion}
            onChange={handleChange}
            className="form-control"
            rows="10"
          ></textarea>
          <label>Precio</label>
          <input
            type="text"
            name="titulo"
            value={singleComic.precio}
            onChange={handleChange}
            className="form-control"
          ></input>
          <label>Disponible</label>
          <input
            type="text"
            name="titulo"
            value={singleComic.stock}
            onChange={handleChange}
            className="form-control"
          ></input>
        </form>
      </div>
      <img
        className={`${styles.img} ${styles.column}`}
        src={singleComic.imagenUrl}
      />
      <div className={styles.column}>
        <h1 className={styles.h1}>{singleComic.nombre}</h1>
        <p className={styles.details}>{singleComic.descripcion}</p>
        <h2 className={styles.h1}>
          Precio:<strong>{singleComic.precio}</strong>
        </h2>
        <h2 className={styles.h1}>
          Disponibles: <strong>{singleComic.stock}</strong>
        </h2>
      </div>
    </div>
  );
};
