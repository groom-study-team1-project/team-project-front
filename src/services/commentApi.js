export const createComment = async (postId, body, token) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // const response = await axios.post(`/api/comments/{postId}/write`, body, {
    // headers: headers,
    //});

    const response = {
      code: 1300,
      message: "댓글이 성공적으로 작성되었습니다.",
    };

    if (response.code === 1300) {
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

export const fetchComment = async (postId, commentId, body) => {
  try {
    // const response = await axios.get("/comments/{postId}?comment-id=`, body, {
    //   params: {
    //     commentId
    //   },
    // });

    const response = {
      code: 1301,
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

    if (response.code === 1301) {
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
    //const response = await axios.patch(`/api/comments/{commentId}`, body, {
    //   headers: headers,
    //});
    const response = {
      code: 1302,
      message: "댓글이 성공적으로 수정되었습니다.",
    };

    if (response.code === 1302) {
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
    //const response = await axios.patch(`/api/comments/{commentId}`, body, {
    //   headers: headers,
    //});
    const response = {
      code: 1303,
      message: "댓글이 정상적으로 삭제되었습니다.",
    };

    if (response.code === 1303) {
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
