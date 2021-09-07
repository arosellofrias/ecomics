import * as React from "react";
import Link from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {singleComicRequest} from "../state/comics"


export default (props)=>{
    const dispatch = useDispatch();
    console.log("PROPS",props)
    const singleComic = useSelector((state) => state.singleComic);
    useEffect(()=>{
        dispatch(singleComicRequest(props.match.params.id))
    },[])
    return(
        <div>
            {console.log("SINGLECOMIC", singleComic[0])}
           {singleComic[0] ? <h1>{singleComic[0].title}</h1> : <h2>Loading</h2>}
           
           {/* <img src={singleComic[0].urls[0].url}/> */}
        </div>
    )
}