import React from 'react';
import { createSlice } from "@reduxjs/toolkit";  const initialState = {   isDarkMode: false, };  const themeSlice = createSlice({   name: "theme",   initialState,   reducers: {     changeTheme: (state) => {       state.isDarkMode = !state.isDarkMode;     },   }, });  export const { changeTheme } = themeSlice.actions; export default themeSlice.reducer;
