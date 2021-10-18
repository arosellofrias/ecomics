import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios"

export const getComicsRequest = createAsyncThunk("COMICS", async() => {

    return  await axios.get(`http://localhost:3001/api/product`).then((r) => r.data)/* .then((comics)=> (comics)); */
  });
  
  export const comicsReducer = createReducer([], {
    [getComicsRequest.fulfilled]: (state, action) => (action.payload)
  });

  export const getComicsByTitle = createAsyncThunk("COMICSBYTITLE", async(title) => {

    return  await axios.get(`http://localhost:3001/api/product/search/${title}`).then((r) => r.data)/* .then((comics)=> (comics)); */
  });
  export const comicsByTitleReducer = createReducer([], {
    [getComicsByTitle.fulfilled]: (state, action) => (action.payload)
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

  export const deleteComicRequest= createAsyncThunk("DELETECOMIC", async (id) =>{

    return await(
       axios.delete(`http://localhost:3001/api/product/${id}`).then((r) => r)

    )
  })

  export const deleteComicReducer = createReducer([],{
    [deleteComicRequest.fulfilled]: (state,action)=>action.payload
  })

  export const createComicRequest= createAsyncThunk("CREATE_COMIC", async (obj) =>{

    return await(
       axios.post(`http://localhost:3001/api/product/`,obj).then((r) => r)

    )
  })