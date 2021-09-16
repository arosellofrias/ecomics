import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const reviewRequest = createAsyncThunk("REVIEWS_PRODUCT", async (productId) => {
  console.log("EL_ID_PRODUCT",productId)
  return await axios
    .get(`http://localhost:3001/api/review`, { params: { productId:productId } })
    .then((r) => r.data);
});

export const reviewsReducer = createReducer([], {
  [reviewRequest.fulfilled]: (state, action) => (action.payload)
});

export const createReviewRequest = createAsyncThunk("CREATE_REVIEWS_PRODUCT", async (obj) => {
    return await axios
      .post(`http://localhost:3001/api/review`,obj)
      .then((r) => r.data);
  });

  export const deleteReviewRequest = createAsyncThunk("DELETE_REVIEWS_PRODUCT", async (obj) => {
    return await axios
      .delete(`http://localhost:3001/api/review`,obj)
      .then((r) => r.data);
  });