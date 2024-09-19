import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import menuReducer from "./category/menuSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
