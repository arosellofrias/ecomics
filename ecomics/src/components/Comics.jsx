import * as React from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {getComicsRequest} from "../state/comics"
import styles from "./compStyles/comics.module.css"


export default ()=>{
    const comics = useSelector((state) => state.comics);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const comicsByTitle = useSelector((state) => state.comicsByTitle);
    const dispatch = useDispatch();
    return(
        <div className={styles.comics}>
            {comicsByTitle.length == 0 ? comics.map((singleComic) => (
            <div id={singleComic.id} className={styles.singleComic}>
                <Link to={`/comics/${singleComic.id}`}>
                <h1 className={styles.h1}>{singleComic.nombre}</h1>
                <img className={styles.img} src={singleComic.imagenUrl}/>
                <strong>${singleComic.precio}</strong>
                </Link>
            </div>
        )) : comicsByTitle.map((singleComic) => (
            <div id={singleComic.id} className={styles.singleComic}>
                <Link to={`/comics/${singleComic.id}`}>
                <h1 className={styles.h1}>{singleComic.nombre}</h1>
                <img  className={styles.img} src={singleComic.imagenUrl}/>
                <strong  >${singleComic.precio}</strong>
                </Link>

            </div>
        ))}
        
        </div>
    )
}