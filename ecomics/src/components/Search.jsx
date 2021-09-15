import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {getComicsByTitle } from "../state/comics";

const Search = () => {
  const dispatch = useDispatch();

  const [comic, setComic] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setComic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getComicsByTitle(comic));
    setComic("");
  };


  return (
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
  );
};

export default Search;
