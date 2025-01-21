import {createSlice} from '@reduxjs/toolkit';
import {
    fetchComment,
    createComment,
    deleteComment,
    editComment,
    likeComment,
    unLikeComment,
    fetchReplyComment,
    createReplyComment
} from '../../services/api/commentApi';
/*import {
    fetchComment,
    createComment,
    deleteComment,
    editComment,
    likeComment,
    unLikeComment,
    fetchReplyComment,
    createReplyComment
} from '../../services/api/mockCommentApi';*/
import {enableMapSet} from 'immer';
import {useSelector} from "react-redux";

enableMapSet();

const initialState = {
    comments: [],
    replies: {},
    ui: {
        isLoading: false,
        error: null,
        successMessage: null,
        isEndComment: false
    },
    meta: {
        commentCount: Number(localStorage.getItem('commentCount')) || 0
    }
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        addComment: (state, action) => {
            state.comments.unshift(action.payload);
            state.meta.commentCount += 1;
            localStorage.setItem('commentCount', state.meta.commentCount);
        },
        appendComment: (state, action) => {
            const newComments = action.payload.filter(newComment =>
                !state.comments.some(existing => existing.id === newComment.id)
            );
            state.comments = [...state.comments, ...newComments];
        },
        removeComment: (state, action) => {
            state.comments = state.comments.filter(comment => Number(comment.id) !== action.payload);
            state.meta.commentCount -= 1;
            localStorage.setItem('commentCount', state.meta.commentCount);
        },
        updateComment: (state, action) => {
            const index = state.comments.findIndex(comment => comment.id === action.payload.id);
            if (index !== -1) {
                state.comments[index] = {
                    ...state.comments[index],
                    content: action.payload.content,
                    modified: true
                };
            }
        },
        setReplies: (state, action) => {
            const { commentId, replies } = action.payload;
            state.replies[commentId] = replies;
        },
        updateReply: (state, action) => {
            const { id, content } = action.payload;
            Object.keys(state.replies).forEach(commentId => {
                const replyIndex = state.replies[commentId].findIndex(reply => reply.id === id);
                if (replyIndex !== -1) {
                    state.replies[commentId][replyIndex] = {
                        ...state.replies[commentId][replyIndex],
                        content,
                        modified: true
                    };
                }
            });
        },
        removeReply: (state, action) => {
            Object.keys(state.replies).forEach(commentId => {
                state.replies[commentId] = state.replies[commentId].filter(
                    reply => reply.id !== action.payload
                );
            });
            state.meta.commentCount -= 1;
            localStorage.setItem('commentCount', state.meta.commentCount);
        },
        toggleLike: (state, action) => {
            console.log("action : ", action);
            const { commentId, isComment, likeCount } = action.payload;
            if (isComment) {
                const comment = state.comments.find(c => c.id === commentId);
                if (comment) {
                    comment.likedMe = comment.likedMe ? false : true;
                    comment.likeCount = comment.likeCount + likeCount;
                }
            } else {
                Object.keys(state.replies).forEach(key => {
                    const replyIndex = state.replies[key].findIndex(reply => reply.id === commentId);
                    if (replyIndex !== -1) {
                        state.replies[key][replyIndex] = {
                            ...state.replies[key][replyIndex],
                            likedMe: state.replies[key][replyIndex].likedMe ? false : true,
                            likeCount: state.replies[key][replyIndex].likeCount + likeCount
                        };
                    }
                });
            }
        },
        addReplies: (state, action) => {
            const { commentId, replies } = action.payload;
            if (!state.replies[commentId]) {
                state.replies[commentId] = [];
            }
            const existingIds = new Set(state.replies[commentId].map(reply => reply.id));
            const newReplies = replies.filter(reply => !existingIds.has(reply.id));

            state.replies[commentId] = [
                ...newReplies,
                ...state.replies[commentId]
            ];
        },
        // 에러, 로딩 등의 ui 묶은 것들의 상태를 한번에 관리할 수 있게 함
        setUIState: (state, action) => {
            state.ui = { ...state.ui, ...action.payload };
        }
    }
});

export const fetchCommentList = (postId, lastCommentId) => async (dispatch, getState) => {
    dispatch(setUIState({ isLoading : true }));
    const accessToken = getState().user.userInfo.accessToken;
    const isLogin = getState().user.isLoggedIn;

    try {
        const response = await fetchComment(postId, lastCommentId, accessToken, isLogin);
        const comments = response.result || [];

        dispatch(lastCommentId ? appendComment(comments) : setComments(comments));
        dispatch(setUIState({
            isEndComment: comments.length < 5,
            isLoading: false,
            error: null
        }));
    } catch (error) {
        dispatch(setUIState({
            error: error.message,
            isLoading: false,
        }));
    }
};

export const createCommentThunk = (postId, content) => async (dispatch) => {
    try {

        const response = await createComment(postId, content);
        console.log('API 응답:', response);

        dispatch(addComment(response.result));
        dispatch(fetchCommentList(postId));
        dispatch(setUIState({
            successMessage: response.data.message
        }));
        return true;

    } catch (error) {
        console.error('댓글 작성 중 오류:', error);
        dispatch(setUIState({ error: error.message }));
        return false;
    }
};

export const deleteCommentThunk = (id, isComment = true) => async (dispatch) => {
    try {
        const response = await deleteComment(id);

        if (response.status?.code === 9999) {
            if (isComment) {
                dispatch(removeComment(id));
            } else {
                dispatch(removeReply(id));
            }
        }

        dispatch(setUIState({
            successMessage: response.status.message || "댓글이 성공적으로 삭제되었습니다."
        }));

        return true;
    } catch (error) {
        dispatch(setUIState({ error: error.message }));
        return false;
    }
};

export const likeCommentThunk = (commentId, isComment = true) => async (dispatch) => {
    try {
        const result = await likeComment(commentId);
        console.log("likeCommentThunk ====> ", result);
        if (result.status?.code === 1406) {
            dispatch(toggleLike({commentId: commentId, isComment: isComment, likeCount: 1}));
            return true;
        }
        return false;
    } catch (error) {
        dispatch(setUIState({ error : error.message }));
        return false;
    }
};

export const submitEditCommentThunk = (id, content, isComment = true) => async (dispatch) => {
    try {
        const response = await editComment(id, content);
        if (response.status?.code === 1406) {
            if (isComment) {
                dispatch(updateComment({
                    id,
                    content: response.result.content
                }));
            } else {
                dispatch(updateReply({
                    id,
                    content: response.result.content
                }));
            }

            dispatch(setUIState({
                successMessage: response.status.message || '댓글이 수정되었습니다.'
            }));

            return true;
        } else {
            dispatch(setUIState({
                error: response.status?.message || '댓글 수정에 실패했습니다.'
            }));
            return false;
        }
    } catch (error) {
        dispatch(setUIState({ error: error.message || '댓글 삭제 중 오류가 발생했습니다.' }));
        return false;
    }
};

export const unlikeCommentThunk = (commentId, isComment = true) => async (dispatch) => {
    try {
        const response = await unLikeComment(commentId);
        dispatch(toggleLike({
            commentId: commentId,
            isComment: isComment,
            likeCount: -1
        }));

        dispatch(setUIState({
            successMessage: response.status.message || '좋아요를 취소했습니다.'
        }));

        return true;
    } catch (error) {
        dispatch(setUIState({ error : error.message }))
        return false;
    }
}

export const fetchReplyList = (commentId, lastCommentId) => async (dispatch, getState) => {
    dispatch(setUIState({ isLoading : true }));
    const accessToken = getState().user.userInfo.accessToken;
    const isLogin = getState().user.isLoggedIn;
    try {
        const response = await fetchReplyComment(commentId, lastCommentId, accessToken, isLogin);

        const replies = response.result || [];

        if (lastCommentId) {
            dispatch(addReplies({
                commentId,
                replies: replies
            }));
        } else {
            dispatch(setReplies({
                commentId,
                replies: replies
            }));
        }

        dispatch(setUIState({
            isEndComment: replies.length < 5,
            isLoading: false,
            successMessage: response.status.message
        }));

    } catch (error) {
        dispatch(setUIState({
            error: error.message,
            isLoading: false
        }));
    }
};

export const createReplyThunk = (commentId, content) => async (dispatch) => {
    try {
        const response = await createReplyComment(commentId, content);
        if (response.status?.code === 9999) {
            dispatch(addReplies({
                commentId: commentId,
                replies: [response.result]
            }));

            dispatch(setUIState({
                successMessage: response.status.message || '답글이 성공적으로 작성되었습니다.'
            }));

            return true;
        } else {
            dispatch(setUIState({
                error: response.status?.message || '답글 작성에 실패했습니다.'
            }));
            return false;
        }
    } catch (error) {
        dispatch(setUIState({
            error: error.message || '답글 작성 중 오류가 발생했습니다.'
        }));
        return false;
    }
};

export const {
    setComments,
    addComment,
    appendComment,
    removeComment,
    updateComment,
    toggleLike,
    setReplies,
    addReplies,
    updateReply,
    removeReply,
    setUIState
} = commentSlice.actions;

export default commentSlice.reducer;