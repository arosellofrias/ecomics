import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { comicsReducer, singleComicReducer, comicsByTitleReducer  } from "./comics"
import registerReducer from "./userRegister";
import userReducer from "./userLogin"



const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      comics: comicsReducer,
      comicsByTitle: comicsByTitleReducer,
      singleComic: singleComicReducer,
      registerUser: registerReducer,
      isLoggedIn: userReducer
    },
  });
  
  export default store;
  

