export const createComment = async (postId, body, token) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // const response = await axios.post(`/api/comments/write`, body, {
    // headers: headers,
    //});

    const response = {
      code: 1400,
      message: "댓글이 성공적으로 작성되었습니다.",
    };

    if (response.code === 1400) {
      console.log(response);
      return response;
    } else {
      throw new Error(response.message || "댓글 작성 실패");
    }
  } catch (error) {
    console.log("댓글 작성 실패:", error);
    throw error;
  }
};

export const fetchComment = async (postId, memberId, CommentId) => {
  try {
    // const response = await axios.get("/comments/{postId}`, body, {
    //   params: {
    //     commentId: CommentId,
    //     memberId: memberId,
    //   },
    // });

    const response = {
      code: 1404,
      message: "댓글 조회에 성공하였습니다.",
      result: [
        {
          memberInfo: {
            Id: 0,
            nickname: "ALee",
            imageUrl: "~~~",
          },
          commentInfo: {
            content: "comment test",
            recommedCount: 0,
            createdAt: new Date().toLocaleDateString(),
            updatedAt: "수정일자",
            isModified: true,
          },
        },
        {
          memberInfo: {
            Id: 1,
            nickname: "MogensEgeskov",
            imageUrl: "~~~",
          },
          commentInfo: {
            content: "comment test1",
            recommedCount: 2,
            createdAt: new Date().toLocaleDateString(),
            updatedAt: "수정일자",
            isModified: false,
          },
        },
      ],
    };

    if (response.code === 1404) {
      console.log(response);
      return response;
    } else {
      throw new Error(response.message || "댓글 조회 실패");
    }
  } catch (error) {
    console.log("댓글 조회 실패:", error);
    throw error;
  }
};

export const editComment = async (commentId, body, token) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    //const response = await axios.patch(`/api/comments/edit`, body, {
    //   headers: headers,
    //});
    const response = {
      code: 1402,
      message: "댓글이 성공적으로 수정되었습니다.",
    };

    if (response.code === 1402) {
      console.log(response);
      return response;
    } else {
      throw new Error(response.message || "댓글 수정 실패");
    }
  } catch (error) {
    console.log("댓글 수정 실패:", error);
    throw error;
  }
};

export const deleteComment = async (commentId, body, token) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    //const response = await axios.delete(`/api/comments/remove`, body, {
    //   headers: headers,
    //});
    const response = {
      code: 1403,
      message: "댓글이 정상적으로 삭제되었습니다.",
    };

    if (response.code === 1403) {
      console.log(response);
      return response;
    } else {
      throw new Error(response.message || "댓글 삭제 실패");
    }
  } catch (error) {
    console.log("댓글 삭제 실패:", error);
    throw error;
  }
};

export const commentsLike = async (token) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // const response = await axios.post(`/api/comments/like`, {
    //   headers: headers,
    // });
    const response = {
      code: 1406,
      message: "댓글에 좋아요를 눌렸습니다.",
    };
    if (response.code === 1406) {
      console.log(response);
      return response;
    } else {
      throw new Error(response.message || "좋아요 실패");
    }
  } catch (error) {
    console.log("좋아요 실패", error);
  }
};

export const commentsUnlike = async (token) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // const response = await axios.post(`/api/comments/unlike`, {
    //   headers: headers,
    // });
    const response = {
      code: 1407,
      message: "댓글에 좋아요를 취소했습니다.",
    };
    if (response.code === 1407) {
      console.log(response);
      return response;
    } else {
      throw new Error(response.message || "좋아요 취소 실패");
    }
  } catch (error) {
    console.log("좋아요 취소 실패", error);
  }
};
