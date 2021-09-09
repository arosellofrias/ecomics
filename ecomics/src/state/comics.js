import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getComicsRequest = createAsyncThunk("COMICS", async(title) => {

    return  await axios.get(`http://localhost:3001/api/product`).then((r) => r.data).then((comics)=> (comics));
  });
  
  export const comicsReducer = createReducer([], {
    [getComicsRequest.fulfilled]: (state, action) => (console.log("ACTION",action),action.payload)
  });

  
 export const singleComicRequest= createAsyncThunk("SINGLECOMICS", async (id) =>{

    return await(
       axios.get(`http://localhost:3001/api/product/${id}`).then((r) => r.data)/* .then((comics)=> (comics.data))
 */
    )
  })

  export const singleComicReducer = createReducer([],{
    [singleComicRequest.fulfilled]: (state,action)=>action.payload
  })
