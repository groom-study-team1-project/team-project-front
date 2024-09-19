import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: null, // 초기 상태
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    selectMenuItem: (state, action) => {
      console.log("Payload:", action.payload); // 상태 업데이트 전 로그
      state.selectedItem = action.payload; // 선택된 메뉴 ID로 상태 업데이트
      console.log("Updated State:", state.selectedItem); // 상태 업데이트 후 로그
    },
  },
});

export const { selectMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
