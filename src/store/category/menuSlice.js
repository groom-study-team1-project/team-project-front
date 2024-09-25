import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    selectMenuItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { selectMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
