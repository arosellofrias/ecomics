import * as React from "react";
import styles from "./compStyles/editSingleComic.module.css";
import "./compStyles/editComic.css";
import { useDispatch } from "react-redux";
import { createComicRequest } from "../state/comics";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const AdminCreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [comic, setComic] = React.useState({
    nombre: "",
    formato: "",
    imagenUrl: "",
    precio: "",
    agno: "",
    stock: "",
    descripcion: "",
  });

  const { nombre, formato, imagenUrl, precio, agno, stock, descripcion } =
    comic;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setComic((comic) => ({ ...comic, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComicRequest(comic)).then((res) => {
      Swal.fire({
        title: `Comic creado correctamente`,
        text: `Se creo correctamente`,
        icon: "success",
        timer: "2000",
      });
    });
    history.push("/comic");
  };

  const user = localStorage.getItem("user");

  return (
    <div>
      {user && JSON.parse(user).privilegios === true ? (
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
                value={nombre}
                onChange={handleChange}
                className="form-control"
              ></input>
              <label>Formato</label>
              <input
                type="text"
                name="formato"
                value={formato}
                onChange={handleChange}
                className="form-control"
              ></input>
              <label>Imagen</label>
              <input
                type="text"
                name="imagenUrl"
                value={imagenUrl}
                onChange={handleChange}
                className="form-control"
              ></input>
              <label>Descripcion</label>
              <textarea
                type="text"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                className="form-control"
                rows="10"
              ></textarea>
              <label>Año</label>
              <input
                type="number"
                name="agno"
                value={agno}
                onChange={handleChange}
                className="form-control"
              ></input>
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={precio}
                onChange={handleChange}
                className="form-control"
              ></input>
              <label>Disponible</label>
              <input
                type="number"
                name="stock"
                value={stock}
                onChange={handleChange}
                className="form-control"
              ></input>
              <button>Crear</button>
            </form>
          </div>
          <img
            className={`${styles.img} ${styles.column}`}
            src={imagenUrl}
            alt={nombre}
          />
          <div className={styles.column}>
            <h1 className={styles.h1}>{nombre}</h1>
            <p className={styles.details}>{descripcion}</p>
            <h2 className={styles.h1}>
              Precio:<strong>{precio}</strong>
            </h2>
            <h2 className={styles.h1}>
              Disponibles: <strong>{stock}</strong>
            </h2>
          </div>
        </div>
      ) : (
        <div>
          <h1>You shall not pass</h1>
          <img
            src="https://media1.giphy.com/media/YkfhemFXalh7O/giphy.gif?cid=790b7611ea781e4c2093f9763f595210ca323b2befef5596&rid=giphy.gif&ct=g"
            alt="Necesitas ser admin"
          />
          <Link to={"/comics"}>
            <h1>Volver al Home</h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminCreateProduct;
