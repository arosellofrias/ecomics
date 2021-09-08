import * as React from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {singleComicRequest} from "../state/comics"


export default ()=>{
    const comics = useSelector((state) => state.comics);
    const dispatch = useDispatch();
    return(
        <div>
        {comics.map((singleComic) => (
            <div>
                {console.log("SINGLECOMICcCC",singleComic.id)}
                <h1>{singleComic.title}</h1>
                <button  /* onClick={()=>dispatch(singleComicRequest(singleComic.id))} */  ><Link to={`/comics/${singleComic.id}`}>info</Link></button>
                {/* <img src={}/> */}

            </div>
        ))}
        
        
        </div>
    )
}