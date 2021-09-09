import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComicsRequest } from "../state/comics";


export default ()=>{
    const dispatch = useDispatch();

    const [comic, setComic] = React.useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setComic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getComicsRequest(comic));
  };


return(
    <div>
      <header>
        <img src="https://pa1.narvii.com/6927/973868bc9d5ec592e6aaa7195c7c7a1a3bd115e8r1-500-267_hq.gif"></img>
      </header>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>Buscate un comic:</h3>
          <input
            placeholder="Mandale un comic"
            onChange={(e) => handleChange(e)}
          ></input>
        </form>
        </div>
    </div>
)

}