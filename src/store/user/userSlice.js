import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    accessToken: "",
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
  },
});

export const { userLogin, userLogout, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
