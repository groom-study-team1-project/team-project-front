import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";

const initialState = {
    comments: [],
    isLoading: false,
    error: null,
    likeComments: new Set(),
    openReplies: new Set(),
    isEndComment: false,
    totalComment: 0,
    editCommentId: null,
    editCommentContent: '',
};

export const fetchComment = createAsyncThunk(
    'comments/fetchComments',
    async ({ postId, memberId, lastCommentId }) => {
        const baseEndpoint = `/open/comments/${postId}`;
        const queryParams = new URLSearchParams();

        if (memberId) queryParams.append("memberId", memberId);
        if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);

        const endPoint = queryParams.toString() ?
            `${baseEndpoint}?${queryParams.toString()}` :
            baseEndpoint;

        const response = await axiosInstance.get(endPoint);
        return response.data.result;
    }
);

export const submitComment = createAsyncThunk(
    'comments/submitComment',
    async ({ postId, content }) => {
        const response = await axiosInstance.post(`/api/comments/write`, {
            postId: parseInt(postId),
            content: content.trim(),
        });
        return response.data;
    }
);

export const handleLike = createAsyncThunk(
    'comments/handleLike',
    async ({ commentId, isLiked }) => {
        const endPoint = isLiked ? `/api/comments/unlike` : `/api/comments/like`;
        await axiosInstance.post(endPoint, {
            targetId: commentId,
        });
        return { commentId, isLiked };
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (commentId) => {
        await axiosInstance.delete(`/api/comments/remove`, {
            data: { commentId }
        });
        return commentId;
    }
);

export const editComment = createAsyncThunk(
    '/comments/editComment',
    async (commentId, content) => {
        await axiosInstance.post(`/api/comments/edit`, {
            commentId,
            content: content.trim(),
        });
        return {commentId, content};
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setEditComment: (state, action) => {
            state.editCommentId = action.payload.commentId;
            state.editCommentContent = action.payload.content;
        },
        cancelEditComment: (state) => {
            state.editCommentId = null;
            state.editCommentContent = '';
        },
        toggleReply: (state, action) => {
            const commentId = action.payload;
            if (state.openReplies.has(commentId)) {
                state.openReplies.delete(commentId);
            } else {
                state.openReplies.add(commentId);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComment.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.meta.arg.lastCommentId) {
                    state.comments = [...state.comments, ...action.payload];
                } else {
                    state.comments = action.payload;
                }

                const likeComments = new Set(
                    action.payload.filter(comment => comment.likedMe).Map(comment => comment.id)
                );
                state.likeComments = new Set([...state.likeComments, ...likeComments]);

                if (state.comments.length >= state.totalComment) {
                    state.isEndComment = true;
                }
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.totalComment += 1;
            })
            .addCase(handleLike.fulfilled, (state, action) => {
                const { commentId, isLike } = action.payload;
                if (isLike) {
                    state.likeComments.delete(commentId);
                } else {
                    state.likeComments.add(commentId);
                }

                const comment = state.comments.find(c => c.id === commentId);
                if (comment) {
                    comment.likeCount += isLike ? -1 : 1;
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(
                    comment => comment.id !== action.payload
                );
                state.totalComment -= 1;
            })
            .addCase(editComment.fulfilled, (state, action) => {
                const { commentId, content } = action.payload;
                const comment = state.comments.find(c => c.id === commentId);;
                if (comment) {
                    comment.content = content;
                }
                state.editCommentId = null;
                state.editCommentContent = '';
            })
    },
});

export const {
    setEditComment,
    cancelEditComment,
    toggleReply
} = commentSlice.actions;

export default commentSlice.reducer;