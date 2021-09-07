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
    /* console.log("PROPS",props)
    console.log("comicID", paramsId) */
    useEffect(()=>{
        dispatch(singleComicRequest(props.match.params.id))
    },[]) 
    const singleComic = useSelector((state) => state.singleComic);
    
    return(
        <div>
            {console.log("comiCCCC",singleComic)}
            {/* {singleComic[0].title ? <h1>{singleComic[0].title}</h1> : <h1>loading</h1>} */}
            
        </div>
    )
}