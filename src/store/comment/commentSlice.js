import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";
import {
    fetchComment,
    createComment,
    deleteComment,
    editComment,
    likeComment,
    fetchReplyComment,
    createReplyComments
} from "../../services/api/commentApi";
import { enableMapSet } from 'immer';
enableMapSet();

const initialState = {
    comments: [],
    isLoading: false,
    error: null,
    likeComments: JSON.parse(localStorage.getItem('likeComments')) || [],
    openReplies: JSON.parse(localStorage.getItem('openReplies')) || [],
    isEndComment: false,
    editCommentId: null,
    editCommentContent: '',
    commentCount: 0
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        initializeCommentCount: (state, action) => {
            state.commentCount = action.payload;
        },
        getCommentList: (state, action) => {
            state.isLoading = false;
            state.comments = [...state.comments, ...action.payload.comments];
            state.lastUpdate = Date.now();
            state.error = null;
        },
        addComment: (state, action) => {
            state.comments.unshift(action.payload);
            state.totalComment += 1;
        },
        removeComment: (state, action) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
            state.total
        },
        updateComment: (state, action) => {
            const index = state.comments.findIndex((comment) => comment.id === action.payload);
            if (index !== -1) {
                state.comments[index] = action.payload;
            }
            state.editCommentId = null;
            state.editCommentContent = "";
        },
        appendComment: (state, action) => {
            state.comments = [...state.comments, ...action.payload];
        },
        toggleLike: (state, action) => {
            const commentId = action.payload;
            const likeSet = new Set(state.likeComments);

            if (likeSet.has(commentId)) {
                state.likeComments.delete(commentId);
            } else {
                state.likeComments.add(commentId);
            }

            state.likeComments = Array.from(likeSet);
            localStorage.setItem('likeComments', JSON.stringify(state.likeComments));

            const comment = state.comments.find((c) => c.id === commentId);
            if (comment) {
                comment.likeCount = likeSet.has(commentId) ?
                    comment.likeCount + 1 :
                    comment.likeCount - 1;
            }
        },
        getReplyList: (state, action) => {
            state.comments = [...state.comments, ...action.payload];
        },
        addReplyComment: (state, action) => {
            state.comments.unshift(action.payload);
            state.commentCount += 1;
        },
        setEditComment: (state, action) => {
            state.editCommentId = action.payload.commentId;
            state.editCommentContent = action.payload.content;
        },
        clearEditComment: (state) => {
            state.editCommentId = null;
            state.editCommentContent = "";
        },
        toggleReply: (state, action) => {
            const commentId = action.payload;
            const replySet = new Set(state.openReplies);

            if (replySet.has(commentId)) {
                replySet.delete(commentId);
            } else {
                replySet.add(commentId);
            }
            state.openReplies = Array.from(replySet);
            localStorage.setItem('openReplies', JSON.stringify(state.openReplies));
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const fetchCommentList = (postId, lastCommentId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const result = await fetchComment(postId, lastCommentId);
        if (lastCommentId) {
            dispatch(appendComments(result));
        } else {
            dispatch(setComments(result));
        }
        dispatch(setEndComment(result.length < 20));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const handleCreateComment = (postId, content) => async (dispatch) => {
    try {
        const result = await createComment(postId, content);
        if (result.status?.code === 9999) {
            dispatch(addComment(result.result));
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const handleDeleteComment = (commentId) => async (dispatch) => {
    try {
        const result = await deleteComment(commentId);
        if (result.status?.code === 9999) {
            dispatch(removeComment(commentId));
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const handleEditComment = (commentId, content) => async (dispatch) => {
    try {
        const result = await editComment(commentId, content);
        if (result.status?.code === 9999) {
            dispatch(updateComment(result.result));
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const handleLikeComment = (commentId) => async (dispatch, getState) => {
    const { likeComments } = getState().comments;
    try {
        const likeSet = new Set(likeComments);
        const result = await likeComment(likeSet, commentId);
        if (result.status?.code === 9999) {
            dispatch(toggleLike(commentId));
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const {
    setComments,
    addComment,
    removeComment,
    updateComment,
    appendComments,
    toggleLike,
    toggleReply,
    setLoading,
    setError,
    initializeCommentCount,
    setEndComment,
    setEditComment,
    clearEditComment,
    resetComments
} = commentSlice.actions;

export default commentSlice.reducer;