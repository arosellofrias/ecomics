import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteComicRequest, getComicsRequest } from "../state/comics";
import styles from "./compStyles/comics.module.css";
import Swal from "sweetalert2";

const AdminPage = () => {
  const comics = useSelector((state) => state.comics);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  const handleSubmit = (e, id) => {
    e.preventDefault();
    dispatch(deleteComicRequest(id))
      .then((data) => dispatch(getComicsRequest()))
      .then((res) => {
        Swal.fire({
          title: `Artículo eliminado`,
          text: `eliminaste correctamente`,
          icon: "success",
          timer: "2000",
        });
      });
  };

  return (
    <div>
      {user && JSON.parse(user).privilegios === true ? <><div className={styles.comics}>
      {comics.map((comic) => (
        <div key={comic.id} className={styles.singleComic}>
          <h1 className={styles.h1}>{comic.nombre}</h1>
          <img
            className={styles.img}
            src={comic.imagenUrl}
            alt={comic.nombre}
          />
          <div className={styles.btns}>
            <Link to={`/edit/${comic.id}`}>
              <button className={styles.btn}>Editar</button>
            </Link>
            <button
              className={styles.btn}
              onClick={(e) => handleSubmit(e, comic.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div></>:
    <>
    <h1>You shall not pass. </h1>
    <img src="https://media1.giphy.com/media/YkfhemFXalh7O/giphy.gif?cid=790b7611ea781e4c2093f9763f595210ca323b2befef5596&rid=giphy.gif&ct=g" alt="Necesitas ser admin" />
    <Link to={"/comics"} ><h1>Volver al Home</h1></Link>
    </>}
    
    </div>
  );
};

export default AdminPage;
