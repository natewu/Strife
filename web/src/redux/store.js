import {configureStore} from "@reduxjs/toolkit";
import userReducer from "redux/reducers/userSlice.js";
import appReducer from "redux/reducers/appSlice.js";

export const store = configureStore({
   reducer:{
      user: userReducer,
      app: appReducer,
   }
});