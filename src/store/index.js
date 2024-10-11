import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import sortReducer from "./board/sortSlice";
import menuReducer from "./category/menuSlice";
import themeReducer from "./theme/themeSlice";
import postReducer from "./post/postSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    sort: sortReducer,
    menu: menuReducer,
    theme: themeReducer,
    post: postReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
