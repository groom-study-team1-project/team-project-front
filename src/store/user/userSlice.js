import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    accessToken: "",
    refreshToken: "",
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
      state.userInfo = {
        accessToken: "",
        refreshToken: "",
      };
      state.isLoggedIn = false;
    },
    updateToken: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
  },
});

export const { userLogin, userLogout, updateToken } = userSlice.actions;

export default userSlice.reducer;
