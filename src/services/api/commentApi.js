import axiosInstance from "../axiosConfig";

export const fetchComment = async (postId, lastCommentId, accessToken, isLogin) => {
    const baseEndpoint = `/open/comments/${postId}`;
    const queryParams = new URLSearchParams();


  if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);

  const endpoint = queryParams.toString()
    ? `${baseEndpoint}?${queryParams.toString()}`
    : baseEndpoint;

  console.log(endpoint);

    try {
        if (isLogin) {
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            console.log(response.data);
            return response.data;
        } else {
            const response = await axiosInstance.get(endpoint);
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        throw error;
    }
};

export const createComment = async (postId, content) => {
  const body = {
    postId: postId,
    content: content.trim(),
  };

  try {

    const response = await axiosInstance.post(`/api/comments/write`, body);

    if (response.data.status.code === 1400 && response.data) {
        console.log(response.data);
        return response.data;
    }

  } catch (error) {
        console.error("댓글 작성을 하지 못하였습니다 : ", error);
        throw error;
  }
};

export const deleteComment = async (commentId) => {
    try {
        const response = await axiosInstance.delete(`/api/comments/remove`, {
            data: { commentId : commentId }
        });
        if (response.data.status.code === 1403 && response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("댓글 삭제를 하지 못하였습니다 : ", error);
    }
};

export const editComment = async (commentId, content) => {
  const body = {
    commentId: commentId,
    content: content.trim(),
  };

  try {

        const response = await axiosInstance.post(`/api/comments/edit`, body);
        if (response.data.status.code === 1402 && response.data) {
            return response.data;
        }

    } catch (error) {
        console.error("댓글 수정을 하지 못하였습니다 : ", error);
    }
};

export const likeComment = async (commentId) => {
    const body = { targetId : commentId };

    try {
        const response = await axiosInstance.post(`/api/likes/comments`, body);
        console.log("response ==> ", typeof (response), " response data =>", response);
        if (response.data.status.code === 1406 && response.data) {
            return response.data;
        } else {
            console.log("이거 왜 이러냐", response.data);
        }
    } catch (error) {
        console.error("좋아요를 등록하지 못하였습니다 : ", error);
    }
};

export const unLikeComment = async (commentId) => {
    try {

        const requestBody = {
            data: { targetId : commentId }
        }

        const response = await axiosInstance.delete(`/api/likes/comments`, requestBody);
        if (response.data.status.code === 1407 && response.data) {
            console.log("좋아요 취소 응답 : ", response.data.code, response.data);
            return response.data;
        }
    } catch (error) {
        console.error("좋아요를 반영하지 못하였습니다 : ", error);
    }
}

export const fetchReplyComment = async (commentId, lastCommentId, accessToken, isLogin) => {
    const baseEndpoint = `/open/comments/replies/${commentId}`;
    const queryParams = new URLSearchParams();

    if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);

    const endpoint = queryParams.toString()
        ? `${baseEndpoint}?${queryParams.toString()}`
        : baseEndpoint;

    try {

        const response = await axiosInstance.get(endpoint, {
            headers: {
                Authorization: isLogin ? `Bearer ${accessToken}` : '',
            },
        });
        if (response.data.status.code === 1401) {
            console.log("답글 조회 : ", response.data);
            return response.data;
        }

    } catch (error) {
        console.error('답글 가져오기 실패:', error);
        throw error;
    }
};

export const createReplyComment = async (commentId, content) => {
  const body = {
    commentId: commentId,
    content: content.trim(),
  };
  try {
        const response = await axiosInstance.post(`/api/comments/write/reply`, body);
        if (response.data.status.code === 1401) {
            console.log("답글 생성 :", response.data);
            return response.data;
        }
  } catch (error) {
        console.error("답글을 작성하지 못하였습니다 : ", error);
  }
};
