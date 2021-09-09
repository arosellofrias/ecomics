import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", (obj) => {
    return axios.post("http://localhost:3001/api/user/login", obj).then((r) => r.data);
  });

const loginReducer = createReducer({}, {
    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
});

export default loginReducer