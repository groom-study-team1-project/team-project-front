import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategoryId: null, // Redux state for category ID
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.selectedCategoryId = action.payload; // Update selectedCategoryId
        },
    },
});

export const { setCategoryId } = categorySlice.actions;
export default categorySlice.reducer;
