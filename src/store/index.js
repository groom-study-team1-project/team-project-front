import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import sortReducer from "./board/sortSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sort: sortReducer,
  },
});

export default store;
