import { createSlice } from "@reduxjs/toolkit";
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
} from "../../services/api/mockCommentApi";
import { enableMapSet } from "immer";

enableMapSet();

const parseJSON = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error(`Error parsing JSON for key "${key}":`, error);
    return defaultValue;
  }
};

const initialState = {
  comments: [],
  replies: {},
  isLoading: false,
  error: null,
  likeComments: parseJSON("likeComments", []),
  openReplies: parseJSON("openReplies", []),
  isEndComment: false,
  editCommentId: null,
  editCommentContent: "",
  commentCount: parseJSON("commentCount", 0),
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    appendComments: (state, action) => {
      const newComments = action.payload.filter(
        (newComment) =>
          !state.comments.some((existing) => existing.id === newComment.id)
      );
      state.comments = [...state.comments, ...newComments];
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
      state.commentCount += 1;
      localStorage.setItem("commentCount", JSON.stringify(state.commentCount));
    },
    removeComment: (state, action) => {
      console.log("삭제할 댓글 ID:", action.payload);
      console.log("현재 댓글들:", state.comments);
      console.log("댓글 ID 타입:", typeof action.payload);
      console.log("첫 번째 댓글의 ID 타입:", typeof state.comments[0]?.id);
      state.comments = state.comments.filter(
        (comment) => Number(comment.id) !== action.payload
      );
      state.commentCount -= 1;
      localStorage.setItem("commentCount", JSON.stringify(state.commentCount));
    },
    updateComment: (state, action) => {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (index !== -1) {
        state.comments[index] = {
          ...state.comments[index],
          content: action.payload.content,
          modified: true,
        };
      }
      state.editCommentId = null;
      state.editCommentContent = "";
    },
    toggleLike: (state, action) => {
      console.log("action : ", action.payload);
      const { commentId, updatedComment } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.likedMe = updatedComment.likedMe;
        comment.likeCount = updatedComment.likeCount;
      }
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
      localStorage.setItem("openReplies", JSON.stringify(state.openReplies));
    },
    setReplies: (state, action) => {
      const { commentId, replies } = action.payload;
      state.replies[commentId] = replies;
    },
    appendReplies: (state, action) => {
      const { commentId, replies } = action.payload;
      state.replies[commentId] = [
        ...(state.replies[commentId] || []),
        ...replies,
      ];
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
      localStorage.setItem("commentCount", JSON.stringify(action.payload));
    },
  },
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
    dispatch(setEndComment(result.comments.length < 5));
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

export const submitEditComment = (commentId, content) => async (dispatch) => {
  try {
    const result = await editComment(commentId, content);
    if (result.status?.code === 9999) {
      dispatch(updateComment(result.result));
      return true;
    }
    return false;
  } catch (error) {
    dispatch(setError(error.message));
    return false;
  }
};

export const handleLikeComment = (commentId) => async (dispatch) => {
  try {
    const result = await likeComment(commentId);
    if (result.status?.code === 9999) {
      dispatch(
        toggleLike({
          commentId,
          updatedComment: result.result,
        })
      );
      return true;
    }
    return false;
  } catch (error) {
    dispatch(setError(error.message));
    return false;
  }
};

export const handleReplyToggle = (commentId) => async (dispatch, getState) => {
  const { openReplies, replies } = getState().comments;
  const replySet = new Set(openReplies);
  const isOpening = !replySet.has(commentId);

  if (isOpening && !replies[commentId]) {
    dispatch(setLoading(true));
    try {
      const result = await fetchReplyComment(commentId, null);
      dispatch(setReplies({ commentId, replies: result.comments }));
      dispatch(setEndComment(result.comments.length < 5));
    } catch (error) {
      dispatch(setError(error.message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }

  dispatch(toggleReply(commentId));
  return true;
};

export const handleCreateReply = (commentId, content) => async (dispatch) => {
  try {
    const result = await createReplyComment(commentId, content);
    if (result.status?.code === 9999) {
      dispatch(appendReplies(result.result));
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
  toggleReply,
  setLoading,
  setError,
  setEndComment,
  initializeCommentCount,
  appendReplies,
  setReplies,
} = commentSlice.actions;

export default commentSlice.reducer;
