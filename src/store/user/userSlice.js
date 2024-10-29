import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {
    accessToken: "",
    refreshToken: "",
  },
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    },
    userLogout: (state) => {
      state.userInfo = {
        accessToken: "",
        refreshToken: "",
      };
      state.isLoggedIn = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isLoggedIn");
    },
    updateToken: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});

export const { userLogin, userLogout, updateToken } = userSlice.actions;

export default userSlice.reducer;
