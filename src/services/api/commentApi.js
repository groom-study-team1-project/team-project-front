import axiosInstance from "../axiosConfig";

export const fetchComment = async (postId, memberId, lastCommentId) => {
    const baseEndpoint = `/open/comments/${postId}`;
    const queryParams = new URLSearchParams();

    if (memberId) queryParams.append('member_id', memberId);
    if (lastCommentId) queryParams.append('last_comment_id', lastCommentId);

    const endpoint = queryParams.toString() ?
        `${baseEndpoint}?${queryParams.toString()}` : baseEndpoint;
    console.log(endpoint);

    try {
        const response = await axiosInstance.get(endpoint);
        if (response.data.status.code === 9999) {
            return response.data.result;
        } else {
            throw new Error(
                response.data.status.message ||
                "댓글이 없거나 존재하지 않습니다."
            );
        }
    } catch (error) {
        console.error("댓글 호출 중 에러가 생겼습니다.");
        throw error;
    }
};

export const createComment = async (postId, content) => {
    const body = {
        postId : postId,
        content : content.trim()
    };

    try {
        const result = await axiosInstance.post(`/api/comments/write`, body);
        return result.data;

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
        return response.data;
    } catch (error) {
        console.error("댓글 삭제를 하지 못하였습니다 : ", error);
    }
};

export const editComment = async (commentId, content) => {
    const body = {
        commentId : commentId,
        content : content.trim()
    };

    try {
        const response = await axiosInstance.post(`/api/comments/edit`, body);
        if (response.data.status.code === 9999) {
            return response.data;
        }
    } catch (error) {
        console.error("댓글 수정을 하지 못하였습니다 : ", error);
    }
};

export const likeComment = async (likeComments ,commentId) => {
    const body = { targetId : commentId };

    if (likeComments.has(commentId)) {
        try {
            const response = await axiosInstance.post(`/api/comments/unlike`, body);
            if (response.data.status.code === 9999) {
                console.log("좋아요 응답 : ", response.data.code, response.data);
                return response.data;
            }
        } catch (error) {
            console.error("좋아요를 취소하지 못하였습니다 : ", error);
        }
    } else {
        try {
            const response = await axiosInstance.post(`/api/comments/like`, body);
            if (response.data.status.code === 9999) {
                console.log("좋아요 취소 응답 : ", response.data.code, response.data);
                return response.data;
            }
        } catch (error) {
            console.error("좋아요를 반영하지 못하였습니다 : ", error);
        }
    }
};

export const fetchReplyComment = async (commentId, memberId, lastCommentId) => {
    const baseEndpoint = `/open/comments/replies/${commentId}`;
    const queryParams = new URLSearchParams();

    if (memberId) queryParams.append('memberId', memberId);
    if (lastCommentId) queryParams.append('lastCommentId', lastCommentId);

    const endpoint = queryParams.toString() ?
        `${baseEndpoint}?${queryParams.toString()}` : baseEndpoint;

    try {
        const response = await axiosInstance.get(endpoint);
        if (response.data.status.code === 9999) {
            return response.data.result;
        }
    } catch (error) {
        console.error("답글을 가져오지 못했습니다 : ", error);
    }
};

export const createReplyComments = async (commentId, content) => {
    const body = {
        commentId : commentId,
        content : content.trim()
    };

    try {
        const response = await axiosInstance.post(`/api/comments/write/reply`, body);
        if (response.data.status.code === 9999) {
            return response.data;
        }
    } catch (error) {
        console.error("답글을 작성하지 못하였습니다 : ", error);
    }
};