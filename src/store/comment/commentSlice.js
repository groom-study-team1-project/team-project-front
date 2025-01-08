import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    replies: [],
    isLoading: false,
    error: null,
    likedReplies: new Set(),
    isEndReply: false
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    
})

export default commentSlice.reducer;