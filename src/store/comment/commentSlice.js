    import {createSlice} from '@reduxjs/toolkit';
    /*import {
        fetchComment,
        createComment,
        deleteComment,
        editComment,
        likeComment,
        fetchReplyComment,
        createReplyComment
    } from '../../services/api/commentApi';*/
    import {
        createComment,
        createReplyComment,
        deleteComment,
        editComment,
        fetchComment,
        fetchReplyComment,
        likeComment,
        unLikeComment
    } from "../../services/api/mockCommentApi";
    import {enableMapSet} from 'immer';

    enableMapSet();

    const initialState = {
        comments: [],
        replies: {},
        ui: {
            isLoading: false,
            error: null,
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
                console.log('삭제할 댓글 ID:', action.payload);
                console.log('현재 댓글들:', state.comments);
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
                state.ui.editCommentId = null;
            },
            setReplies: (state, action) => {
                const { commentId, replies } = action.payload;
                state.replies[commentId] = replies;
            },
            appendReplies: (state, action) => {
                const addReply = action.payload.filter(reply =>
                    !state.comments.some(existing => existing.id === reply.id)
                );
                state.comments = [...state.comments, ...addReply];
            },
            toggleLike: (state, action) => {
                console.log("action : ", action.payload);
                const { commentId, updatedComment } = action.payload;
                const comment = state.comments.find(c => c.id === commentId);
                if (comment) {
                    comment.likedMe = updatedComment.likedMe;
                    comment.likeCount = updatedComment.likeCount;
                }
            },
            addReplies: (state, action) => {
                const { commentId, replies } = action.payload;
                if (!state.replies[commentId]) {
                    state.replies[commentId] = [];
                }

                state.replies[commentId] = [
                    ...(state.replies[commentId] || []),
                    ...replies
                ];
            },
            // 에러, 로딩 등의 ui 묶은 것들의 상태를 한번에 관리할 수 있게 함
            setUIState: (state, action) => {
                state.ui = { ...state.ui, ...action.payload };
            }
        }
    });

    export const fetchCommentList = (postId, lastCommentId) => async (dispatch) => {
        dispatch(setUIState({ isLoading : true }));
        try {
            const result = await fetchComment(postId, lastCommentId);
            dispatch(lastCommentId ? appendComment(result.comments) : setComments(result.comments));
            dispatch(setUIState({
                isEndComment: result.length < 5,
                isLoading: false
            }));
        } catch (error) {
            dispatch(setUIState({
                error: error.message,
                isLoading: false
            }));
        }
    };

    export const likeCommentThunk = (commentId) => async (dispatch) => {
        try {
            const result= await likeComment(commentId);
            if (result.status?.code === 9999) {
                dispatch(toggleLike({
                    commentId,
                    updatedComment : result.result
                }));
                return true;
            }
            return false;
        } catch (error) {
            dispatch(setUIState({ error : error.message }));
            return false;
        }
    };

    export const unlikeCommentThunk = (commentId) => async (dispatch) => {
        try {
            const result = await unLikeComment(commentId);
            if (result.status?.code === 9999) {
                dispatch(toggleLike({
                    commentId,
                    updatedComment : result.result
                }));
                return true;
            }
            return false;
        } catch (error) {
            dispatch(setUIState({ error : error.message }))
            return false;
        }
    }

    export const createCommentThunk = (postId, content) => async (dispatch) => {
        try {
            const result = await createComment(postId, content);
            if (result.status?.code === 9999) {
                dispatch(addComment(result.result));
                return true;
            }
            return false;
        } catch (error) {
            dispatch(setUIState({ error: error.message }));
            return false;
        }
    };

    export const deleteCommentThunk = (commentId) => async (dispatch) => {
        try {
            const result = await deleteComment(commentId);
            if (result.status?.code === 9999) {
                dispatch(removeComment(commentId));
                return true;
            }
            return false;
        } catch (error) {
            dispatch(setUIState({ error: error.message }));
            return false;
        }
    };

    export const submitEditCommentThunk = (commentId, content) => async (dispatch) => {
        try {
            const result = await editComment(commentId, content);
            if (result.status?.code === 9999) {
                dispatch(updateComment(result.result));
                return true;
            }
            return false;
        } catch (error) {
            dispatch(setUIState({ error: error.message }));
            return false;
        }
    };

    export const fetchReplyList = (commentId, lastCommentId) => async (dispatch) => {
        dispatch(setUIState({ isLoading : true }));
        try {
            const result = await fetchReplyComment(commentId, lastCommentId);
            dispatch(lastCommentId ? appendReplies(result.comments) : setReplies(result.comments))
            dispatch(setUIState({
                isEndComment: result.length < 5,
                isLoading: false
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
            const result = await createReplyComment(commentId, content);
            if (result.status?.code === 9999) {
                dispatch(addReplies({
                    commentId: commentId,
                    replies: [result.result]
                }));
                return true;
            }
            return false;
        } catch (error) {
            dispatch(setUIState({
                error : error.message
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
        appendReplies,
        setUIState
    } = commentSlice.actions;

    export default commentSlice.reducer;