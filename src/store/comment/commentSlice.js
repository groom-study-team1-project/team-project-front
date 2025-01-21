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
                console.log("action : ", action.payload);
                const { commentId, updatedComment, updateReply } = action.payload;
                if (updatedComment) {
                    const comment = state.comments.find(c => c.id === commentId);
                    if (comment) {
                        comment.likedMe = updatedComment.likedMe;
                        comment.likeCount = updatedComment.likeCount;
                    }
                } else if (updateReply) {
                    Object.keys(state.replies).forEach(key => {
                        const replyIndex = state.replies[key].findIndex(reply => reply.id === commentId);
                        if (replyIndex !== -1) {
                            state.replies[key][replyIndex] = {
                                ...state.replies[key][replyIndex],
                                likedMe: updateReply.likedMe,
                                likeCount: updateReply.likeCount
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

    export const likeCommentThunk = (commentId, isComment = true) => async (dispatch) => {
        try {
            const result= await likeComment(commentId);
            if (result.status?.code === 9999) {
                dispatch(toggleLike({
                    commentId,
                    ...(isComment ? { updatedComment : result.result } : { updateReply : result.result})
                }));
                return true;
            }
            return false;
        } catch (error) {
            dispatch(setUIState({ error : error.message }));
            return false;
        }
    };

    export const unlikeCommentThunk = (commentId, isComment = true) => async (dispatch) => {
        try {
            const result = await unLikeComment(commentId);
            if (result.status?.code === 9999) {
                dispatch(toggleLike({
                    commentId,
                    ...(isComment ? { updatedComment : result.result } : { updateReply : result.result})
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

    export const deleteCommentThunk = (id, isComment = true) => async (dispatch) => {
        try {
            const result = await deleteComment(id);
            if (isComment) {
                if (result.status?.code === 9999) {
                    dispatch(removeComment(id));
                    return true;
                }
            } else {
                if (result.status?.code === 9999) {
                    dispatch(removeReply(id));
                    return true;
                }
            }
            return false;
        } catch (error) {
            dispatch(setUIState({ error: error.message }));
            return false;
        }
    };

    export const submitEditCommentThunk = (id, content, isComment = true) => async (dispatch) => {
        try {
            const result = await editComment(id, content);
            if (result.status?.code === 9999) {
                if (isComment) {
                    dispatch(updateComment({
                        id,
                        content: result.result.content
                    }));
                } else {
                    dispatch(updateReply({
                        id,
                        content: result.result.content
                    }));
                }
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
            if (lastCommentId) {
                dispatch(addReplies({
                    commentId,
                    replies: result.comments
                }));
            } else {
                dispatch(setReplies({
                    commentId,
                    replies: result.comments
                }));
            }
            dispatch(setUIState({
                isEndComment: result.comments.length < 5,
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
        updateReply,
        removeReply,
        setUIState
    } = commentSlice.actions;

    export default commentSlice.reducer;