import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getComicsRequest = createAsyncThunk("COMICS", (title) => {

    return axios.get("https://gateway.marvel.com/v1/public/comics?ts=1&format=comic&formatType=comic&title=avengers&apikey=e121962b2f2979ad43d0854ba839ec8c&hash=6715ac36ab30c15efdf476a60a490ae8").then((r) => r.data).then((comics)=> (comics.data.results));
  });
  
  const comicsReducer = createReducer([], {
    [getComicsRequest.fulfilled]: (state, action) => (console.log("ACTION",action),action.payload),
  });
  
  export default comicsReducer;
  