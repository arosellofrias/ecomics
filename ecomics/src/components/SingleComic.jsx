import * as React from "react";
import Link, { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {singleComicRequest} from "../state/comics"
import { useState } from "react";
import styles from "./compStyles/singleComic.module.css"


export default (props)=>{
    
    const dispatch = useDispatch();
    console.log("PROPS",props)
    const params = useParams()
    const paramsId = params.id
     useEffect(()=>{
        dispatch(singleComicRequest(paramsId))
    },[paramsId])  
    const singleComic = useSelector((state) => state.singleComic);
    
    return(
        <div className={styles.container}>
            {console.log("FUNCA??=>>",singleComic)}
            {Object.keys(singleComic).length ? <>
            <img className={`${styles.img} ${styles.column }`} src={singleComic.imagenUrl}/>
            <div className={styles.column}>
            <h1 className={styles.h1}>{singleComic.nombre}</h1> 
            <p className={styles.details}>{singleComic.descripcion}</p>
            <h2 className={styles.h1}>Precio:<strong>{singleComic.precio}</strong></h2>
            <h2 className={styles.h1}>Disponibles: <strong>{singleComic.stock}</strong></h2>
            <button className={styles.h1}>Agregar al carrito</button>
            </div>
            </>
            : <h1>Loading..</h1>}
           
       </div>    
   )   
   }
