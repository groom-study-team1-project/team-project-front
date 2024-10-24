import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  isTablet: false,
  isSmallDesktop: false,
  isDesktop: true,
};

const screenSizeSlice = createSlice({
  name: "screenSize",
  initialState,
  reducers: {
    setScreenSize: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;

export default screenSizeSlice.reducer;
