import * as React from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {singleComicRequest} from "../state/comics"


export default ()=>{
    const comics = useSelector((state) => state.comics);
    const dispatch = useDispatch();
    return(
        <div className="movies">
        {comics.map((singleComic) => (
            <div id={singleComic.id}>
                <Link to={`/comics/${singleComic.id}`}>
              {/*   {console.log("SINGLECOMICcCC",singleComic.id)} */}
                <h1>{singleComic.nombre}</h1>
                <img className="img" src={singleComic.imagenUrl}/>
                <button  /* onClick={()=>dispatch(singleComicRequest(singleComic.id))} */  >{/* <Link to={`/comics/${singleComic.id}`}> */}+info{/* </Link> */}</button>
                {/* <img src={}/> */}
                </Link>

            </div>
        ))}
        
        
        </div>
    )
}