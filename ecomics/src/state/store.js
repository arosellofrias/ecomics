import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import comicsReducer from "./comics"


const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      comics: comicsReducer
    },
  });
  
  export default store;
  