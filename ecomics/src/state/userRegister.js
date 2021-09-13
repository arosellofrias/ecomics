import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const sendRegisterRequest = createAsyncThunk("REGISTER", (obj) => {
  return axios
    .post("http://localhost:3001/api/user/register", obj)
    .then((r) => r.data);
});

const registerReducer = createReducer([], {
  [sendRegisterRequest.fulfilled]: (state, action) => action.payload,
});

export default registerReducer;
