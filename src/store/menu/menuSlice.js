import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItemId: null, // 선택된 항목의 ID만 저장
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    selectMenuItem: (state, action) => {
      state.selectedItemId = action.payload;
    },
  },
});

export const { selectMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
