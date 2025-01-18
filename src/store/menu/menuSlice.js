import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItemId: null, // 선택된 항목의 ID만 저장
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    selectMenuItem: (state, action) => {
<<<<<<< HEAD
      state.selectedItemId = action.payload;
=======
      state.selectedItemId = action.payload; // ID만 저장
>>>>>>> main
    },
  },
});

export const { selectMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
