import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategoryId: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.selectedCategoryId = action.payload;
        },
    },
});

export const { setCategoryId } = categorySlice.actions;
export default categorySlice.reducer;