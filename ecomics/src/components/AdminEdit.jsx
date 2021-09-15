import * as React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { singleComicRequest } from "../state/comics";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./compStyles/editSingleComic.module.css";
import "./compStyles/editComic.css";

const AdminEdit = () => {
  const [edit, setEdit] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const paramsId = params.id;

  useEffect(() => {
    dispatch(singleComicRequest(paramsId)).then((data) =>
      setEdit({
        nombre: data.payload.nombre,
        imagen: data.payload.imagenUrl,
        precio: data.payload.precio,
        stock: data.payload.stock,
        descripcion: data.payload.descripcion,
        formato: data.payload.formato,
        imagenUrl: data.payload.imagenUrl,
        paginas: data.payload.paginas,
        id: data.payload.id,
      })
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit((edit) => ({ ...edit, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/product/${edit.id}`, {
        nombre: edit.nombre,
        formato: edit.formato,
        imagenUrl: edit.imagenUrl,
        precio: edit.precio,
        paginas: edit.paginas,
        stock: edit.stock,
        descripcion: edit.descripcion,
      })
      .then((res) => {
        Swal.fire({
          title: `ArtÃ­culo modificado`,
          text: `modificaste correctamente`,
          icon: "success",
          timer: "2000",
        });
      })
      .catch((e) => console.log(e));
  };

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
            name="descripcion"
            value={edit.descripcion}
            onChange={handleChange}
            className="form-control"
            rows="10"
          ></textarea>
          <label>Precio</label>
          <input
            type="text"
            name="precio"
            value={edit.precio}
            onChange={handleChange}
            className="form-control"
          ></input>
          <label>Disponible</label>
          <input
            type="text"
            name="stock"
            value={edit.stock}
            onChange={handleChange}
            className="form-control"
          ></input>
          <button>Modificar</button>
        </form>
      </div>
      <img
        className={`${styles.img} ${styles.column}`}
        src={edit.imagenUrl}
        alt={edit.nombre}
      />
      <div className={styles.column}>
        <h1 className={styles.h1}>{edit.nombre}</h1>
        <p className={styles.details}>{edit.descripcion}</p>
        <h2 className={styles.h1}>
          Precio:<strong>{edit.precio}</strong>
        </h2>
        <h2 className={styles.h1}>
          Disponibles: <strong>{edit.stock}</strong>
        </h2>
      </div>
    </div>
  );
};

export default AdminEdit;
