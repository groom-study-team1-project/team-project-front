import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: "as@asd.asd",
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;

export default userSlice.reducer;
