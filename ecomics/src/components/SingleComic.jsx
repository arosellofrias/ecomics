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
 renderizado-singleComics
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
           {/*  {console.log("singleComic===>", singleComic)} */}
            {/* {console.log("SINGLECOMIC==>", singleComic[0])} */}
            {/* {console.log("COMIC", comic)} */}
            {Object.keys(singleComic).length ? <h1>{singleComic[0].title}</h1> : <h1>Loading..</h1>}
            
            {/* <h1>{singleComic}</h1> */}
         {/*    {console.log("COMC=>>", comic)} */}
            {/* <h1>{singleComic[0].title}</h1> */}
            {/* <h1>{singleComic[0].title}</h1> */}
            
           
           
           {/* <img src={singleComic[0].urls[0].url}/> */}
