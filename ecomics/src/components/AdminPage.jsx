import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteComicRequest,getComicsRequest} from "../state/comics";
import styles from "./compStyles/comics.module.css";

export default () => {
    const comics = useSelector((state) => state.comics);
    const dispatch = useDispatch();

    const handleSubmit = (e, id) => {
        e.preventDefault();
        dispatch(deleteComicRequest(id)).then((data)=>dispatch(getComicsRequest()))
        
    }
    
    
  return (
    <div className={styles.comics}>
      {comics.map((comic) => (
        <div key={comic.id} className={styles.singleComic}>
          <h1 className={styles.h1}>{comic.nombre}</h1>
          <img className={styles.img} src={comic.imagenUrl} />
          <div className={styles.btns}>
            <Link to="/edit">
              <button className={styles.btn}>Editar</button>
            </Link>
              <button className={styles.btn} onClick={(e)=>handleSubmit(e,comic.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};