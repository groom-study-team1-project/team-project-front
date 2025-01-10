import { createSlice } from '@reduxjs/toolkit';
import {
    fetchComment,
    createComment,
    deleteComment,
    editComment,
    likeComment,
    fetchReplyComment,
    createReplyComment
} from '../../services/api/commentApi';
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
    commentCount: JSON.parse(localStorage.getItem('commentCount')) || 0
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        appendComments: (state, action) => {
            state.comments = [...state.comments, ...action.payload];
        },
        addComment: (state, action) => {
            state.comments.unshift(action.payload);
            state.commentCount += 1;
            localStorage.setItem('commentCount', JSON.stringify(state.commentCount));
        },
        removeComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
            state.commentCount -= 1;
            localStorage.setItem('commentCount', JSON.stringify(state.commentCount));
        },
        updateComment: (state, action) => {
            const index = state.comments.findIndex(comment => comment.id === action.payload.id);
            if (index !== -1) {
                state.comments[index] = action.payload;
            }
            state.editCommentId = null;
            state.editCommentContent = '';
        },
        toggleLike: (state, action) => {
            const commentId = action.payload;
            const likeSet = new Set(state.likeComments);

            if (likeSet.has(commentId)) {
                likeSet.delete(commentId);
            } else {
                likeSet.add(commentId);
            }

            state.likeComments = Array.from(likeSet);
            localStorage.setItem('likeComments', JSON.stringify(state.likeComments));

            const comment = state.comments.find(c => c.id === commentId);
            if (comment) {
                comment.likeCount = likeSet.has(commentId) ?
                    comment.likeCount + 1 :
                    comment.likeCount - 1;
            }
        },
        setEditComment: (state, action) => {
            state.editCommentId = action.payload.commentId;
            state.editCommentContent = action.payload.content;
        },
        clearEditComment: (state) => {
            state.editCommentId = null;
            state.editCommentContent = '';
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
            state.isLoading = false;
        },
        setEndComment: (state, action) => {
            state.isEndComment = action.payload;
        },
        initializeCommentCount: (state, action) => {
            state.commentCount = action.payload;
            localStorage.setItem('commentCount', JSON.stringify(action.payload));
        }
    }
});

export const fetchCommentList = (postId, lastCommentId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const result = await fetchComment(postId, lastCommentId);
        if (lastCommentId) {
            dispatch(appendComments(result.comments));
        } else {
            dispatch(setComments(result.comments));
        }
        dispatch(setEndComment(result.comments.length < 5 && Math.min(result.comments.id) === lastCommentId));
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
            return true;
        }
        return false;
    } catch (error) {
        dispatch(setError(error.message));
        return false;
    }
};

export const handleDeleteComment = (commentId) => async (dispatch) => {
    try {
        const result = await deleteComment(commentId);
        if (result.status?.code === 9999) {
            dispatch(removeComment(commentId));
            return true;
        }
        return false;
    } catch (error) {
        dispatch(setError(error.message));
        return false;
    }
};

export const handleEditComment = (commentId, content) => async (dispatch) => {
    try {
        const result = await editComment(commentId, content);
        if (result.status?.code === 9999) {
            dispatch(updateComment(result.result));
            dispatch(clearEditComment());
            return true;
        }
        return false;
    } catch (error) {
        dispatch(setError(error.message));
        return false;
    }
};

export const handleLikeComment = (commentId) => async (dispatch, getState) => {
    const { likeComments } = getState().comments;
    try {
        const likeSet = new Set(likeComments);
        const result = await likeComment(likeSet, commentId);
        if (result.status?.code === 9999) {
            dispatch(toggleLike(commentId));
            return true;
        }
        return false;
    } catch (error) {
        dispatch(setError(error.message));
        return false;
    }
};

export const fetchReplyList = (commentId, lastCommentId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const result = await fetchReplyComment(commentId, lastCommentId);
        if (lastCommentId) {
            dispatch(appendComments(result.comments));
        } else {
            dispatch(setComments(result.comments));
        }
        dispatch(setEndComment(result.comments.length < 5 && Math.min(result.comments.id) === lastCommentId));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const handleCreateReply = (commentId, content) => async (dispatch) => {
    try {
        const result = await createReplyComment(commentId, content);
        if (result.status?.code === 9999) {
            dispatch(addComment(result.result));
            return true;
        }
        return false;
    } catch (error) {
        dispatch(setError(error.message));
        return false;
    }
};

export const {
    setComments,
    appendComments,
    addComment,
    removeComment,
    updateComment,
    toggleLike,
    setEditComment,
    clearEditComment,
    toggleReply,
    setLoading,
    setError,
    setEndComment,
    initializeCommentCount
} = commentSlice.actions;

export default commentSlice.reducer;