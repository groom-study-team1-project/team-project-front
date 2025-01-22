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
            console.log('addComment', action.payload);
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
        toggleLike: (state, action) => {
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
        setReplies: (state, action) => {
            const { commentId, replies } = action.payload;
            state.replies[commentId] = replies;
        },
        addReplies: (state, action) => {
            console.log("답글 액션 : ", action.payload);
            const { commentId, content } = action.payload;

            if (!state.replies[commentId]) {
                state.replies[commentId] = [];
            }

            state.replies[commentId].unshift(content);
            console.log(state.replies[commentId]);
            state.meta.commentCount += 1;
            localStorage.setItem('commentCount', state.meta.commentCount);
        },
        updateReply: (state, action) => {
            const { commentId, replyId, content } = action.payload;
            if (state.replies[commentId]) {
                const replyIndex = state.replies[commentId].findIndex(reply => reply.id === replyId);
                if (replyIndex !== -1) {
                    state.replies[commentId][replyIndex] = {
                        ...state.replies[commentId][replyIndex],
                        content,
                        modified: true
                    };
                }
            }
        },
        removeReply: (state, action) => {
            const { commentId, replyId } = action.payload;
            if (state.replies[commentId]) {
                state.replies[commentId] = state.replies[commentId].filter(
                    reply => reply.id !== replyId
                );
            }
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

        if (lastCommentId) {
            const currentComments = getState().comments.comments;
            const mergedComments = [
                ...currentComments,
                ...comments.filter(newComment =>
                    !currentComments.some(existingComment => existingComment.id === newComment.id)
                )
            ];

            dispatch(setComments(mergedComments));
        } else {
            dispatch(setComments(comments));
        }

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
        console.log('API 응답:', content);

        dispatch(addComment(content));
        dispatch(setUIState({
            successMessage: response.status.message,
            isLoading: false
        }));
        return true;

    } catch (error) {
        console.error('댓글 작성 중 오류:', error);
        dispatch(setUIState({ error: error.message }));
        return false;
    }
};

export const deleteCommentThunk = (commentId, isComment = true, replyId=null) => async (dispatch) => {
    try {
        const response = await deleteComment(commentId);

        if (isComment) {
            dispatch(removeComment(commentId));
        } else {
            dispatch(removeReply({
                commentId, replyId
            }));
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

export const submitEditCommentThunk = (
    commentId,
    content,
    isComment = true,
    replyId = null
) => async (dispatch) => {
    try {
        await editComment(commentId, content);

        if (isComment) {
            dispatch(updateComment({
                commentId: commentId,
                content: content
            }));
        } else {
            dispatch(updateReply({
                commentId: commentId,
                content: content,
                replyId: replyId
            }));
        }

        return true;
    } catch (error) {
        dispatch(setUIState({ error: error.message || '댓글 수정 중 오류가 발생했습니다.' }));
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
    dispatch(setUIState({ isLoading: true }));
    try {
        const { userInfo, isLoggedIn } = getState().user;
        const response = await fetchReplyComment(commentId, lastCommentId, userInfo.accessToken, isLoggedIn);
        console.log(response);
        if (lastCommentId) {
            dispatch(addReplies({
                commentId: commentId,
                content: response.result
            }));
        } else {
            dispatch(setReplies({
                commentId: commentId,
                replies: response.result
            }));
        }

        dispatch(setUIState({
            isEndComment: response.result.length < 5,
            isLoading: false,
            successMessage: response.status.message,
        }));
    } catch (error) {
        dispatch(setUIState({
            error: error.message,
            isLoading: false,
        }));
    }
};

export const createReplyThunk = (commentId, content, nickname, profileImage) => async (dispatch) => {
    try {
        const response = await createReplyComment(commentId, content);
        console.log("유저 정보 : ", nickname, profileImage);

        if (response?.status?.code === 1401) {
            const newReply = {
                id: Date.now(),
                content: content,
                memberNickname: nickname,
                memberImageUrl: profileImage,
                likeCount: 0,
                likedMe: false,
                author: true
            };

            dispatch(addReplies({
                commentId: commentId,
                content: newReply
            }));

            dispatch(setUIState({
                successMessage: response.status.message || "댓글 작성 성공적",
                isLoading: false
            }));
            return true;
        }
        return false;
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