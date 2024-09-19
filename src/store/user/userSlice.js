import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    nickName: "구름이",
    email: "sdad@sad.sadf",
    role: "NORMAL, STUDENT, GRADUATE",
    imageUrl: "image.png",
    aboutMe: "안녕하세요. 구름톤 딥다이브 수강생입니다.",
    phoneNumber: "010-1234-5678",
  },
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
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

export const { setUserInfo, logout, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
