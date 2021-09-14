import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComicsRequest, getComicsByTitle } from "../state/comics";


export default ()=>{
    const dispatch = useDispatch();

    const [comic, setComic] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setComic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getComicsByTitle(comic));
    setComic("")
    
  };

  const comicsByTitle = useSelector((state) => state.comicsByTitle);


return(
    <div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>Buscate un comic:</h3>
          <input
            
            placeholder="Mandale un comic"
            onChange={(e) => handleChange(e)}
            value={comic}
          ></input>
        </form>
        </div>
    </div>
)

}