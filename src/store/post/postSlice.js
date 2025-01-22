import React from 'react';
import { createSlice } from "@reduxjs/toolkit";  const initialState = {   posts: {}, };  const postSlice = createSlice({   name: "post",   initialState,   reducers: {     setAllPostItems: (state, action) => {       state.posts = action.payload;     },   }, });  export const { setAllPostItems } = postSlice.actions; export default postSlice.reducer;
