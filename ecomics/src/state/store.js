import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { comicsReducer, singleComicReducer } from "./comics";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    comics: comicsReducer,
    singleComic: singleComicReducer,
  },
});

export default store;
