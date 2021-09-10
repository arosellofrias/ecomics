import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", (obj) => {
    return axios.post("http://localhost:3001/api/user/login", obj)
    .then((r) => r.data)
    
    .catch(e=>prompt(e));
  });

export const sendLogoutRequest = createAsyncThunk("LOGOUT", () => {
    return axios.get("http://localhost:3001/api/user/logout")
    .then((r) => r.data)
    
    .catch(e=>prompt(e));
  });

const userReducer = createReducer({}, {
    [sendLoginRequest.fulfilled]: (state, action) =>action.payload,
    [sendLogoutRequest.fulfilled]: (state, action) =>action.payload,
});

export default userReducer