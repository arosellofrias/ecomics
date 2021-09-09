import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { comicsReducer, singleComicReducer } from "./comics"
import registerReducer from "./userRegister";
import loginReducer from "./userLogin"



const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      comics: comicsReducer,
      singleComic: singleComicReducer,
      registerUser: registerReducer,
      isLoggedIn: loginReducer
    },
  });
  
  export default store;
  

