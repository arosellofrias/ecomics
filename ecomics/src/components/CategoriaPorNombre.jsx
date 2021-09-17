import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import styles from "./compStyles/comics.module.css";
import { IconButton } from "@material-ui/core";


const CategoriaPorNombre = ()=>{
    const params = useParams()
    const nombre = params.nombre
    const [filtroComics, setFiltroComics] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3001/api/category/${nombre}`)
        .then(res=>setFiltroComics(res.data))
    },[])
    
    return(
        
        <div div className={styles.comics}>
            {console.log("comics=>", filtroComics)}
            {filtroComics.map((singleComic) => (
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
              </IconButton>
            </div>
          ))}
        </div>
    )
}

export default CategoriaPorNombre