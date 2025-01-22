import React from 'react';
import { createSlice } from "@reduxjs/toolkit";  const initialState = {   criteria: "date", };  const sortSlice = createSlice({   name: "sort",   initialState,   reducers: {     setSortCriteria: (state, action) => {       state.criteria = action.payload;     },   }, });  export const { setSortCriteria } = sortSlice.actions;  export default sortSlice.reducer;
