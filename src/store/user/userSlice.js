import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  },
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuth: (state) => {
      state.userInfo = {
        accessToken: localStorage.getItem("accessToken") || "",
        refreshToken: localStorage.getItem("refreshToken") || "",
      };
      state.isLoggedIn =
        JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    },
    userLogin: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.userInfo = { accessToken, refreshToken };
      state.isLoggedIn = true;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    },
    userLogout: (state) => {
      state.userInfo = {
        accessToken: "",
        refreshToken: "",
      };
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isLoggedIn");
    },
    updateToken: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.isLoggedIn = true;
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
  },
});

export const { userLogin, userLogout, updateToken, userAuth } =
  userSlice.actions;

export default userSlice.reducer;
