import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import sortReducer from "./board/sortSlice";
import menuReducer from "./menu/menuSlice";
import themeReducer from "./theme/themeSlice";
import postReducer from "./post/postSlice";
import screenSizeReducer from "./screenResize/screenSlice";
import categoryReducer from "./category/categorySlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    sort: sortReducer,
    menu: menuReducer,
    theme: themeReducer,
    post: postReducer,
    screenSize: screenSizeReducer,
    category: categoryReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
