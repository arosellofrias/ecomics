import * as React from "react";
import Link, { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {singleComicRequest} from "../state/comics"
import { useState } from "react";


export default (props)=>{
    /* const [comic, setComic]=useState({})
    const matchProps =useParams()
    const paramsId = matchProps.id */
    const dispatch = useDispatch();
    console.log("PROPS",props)
    const params = useParams()
    const paramsId = params.id
    /*  const [comic, setComic] = useState([])  */
   /*  const singleComic = useSelector((state) => state.singleComic); */
     useEffect(()=>{
        dispatch(singleComicRequest(paramsId))
    },[paramsId])  
    const singleComic = useSelector((state) => state.singleComic);
    /* useEffect(()=>{
        setComic(singleComic)
    },[]) */ 
    return(
        <div>
            {console.log("FUNCA??=>>",singleComic)}

           {/*  {console.log("singleComic===>", singleComic)} */}
            {/* {console.log("SINGLECOMIC==>", singleComic[0])} */}
            {/* {console.log("COMIC", comic)} */}
            {Object.keys(singleComic).length ? <>
            <h1>{singleComic.nombre}</h1> 
            <img className="img" src={singleComic.imagenUrl}/>
            <p>{singleComic.descripcion}</p>
            <h2>PRECIO:</h2>
            <strong>{singleComic.precio}</strong>
            <br></br>
            <h2>STOCK:</h2>
            <strong>{singleComic.stock}</strong>
            </>
            : <h1>Loading..</h1>}
            
            {/* <h1>{singleComic}</h1> */}
         {/*    {console.log("COMC=>>", comic)} */}
            {/* <h1>{singleComic[0].title}</h1> */}
            {/* <h1>{singleComic[0].title}</h1> */}
            
           
           
           {/* <img src={singleComic[0].urls[0].url}/> */}
       </div>    
   )   
   }
