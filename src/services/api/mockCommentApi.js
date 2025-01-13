let dummyCommentsData = [
    {
        id: 1,
        content: "댓글입니당@@",
        likeCount: 12,
        createdAt: new Date(),
        memberId: 1,
        memberNickname: "버미",
        memberImageUrl: null,
        replyCount: 2,
        modified: true,
        likedMe: true,
        author: true,
        parentId: null
    },
    {
        id: 2,
        content: "댓글입니당@@",
        likeCount: 15,
        createdAt: new Date(),
        memberId: 2,
        memberNickname: "버미",
        memberImageUrl: null,
        replyCount: 2,
        modified: false,
        likedMe: true,
        author: false,
        parentId: null
    },
    {
        id: 3,
        content: "댓글입니당@@",
        likeCount: 12,
        createdAt: new Date(),
        memberId: 3,
        memberNickname: "버미",
        memberImageUrl: null,
        replyCount: 2,
        modified: false,
        likedMe: false,
        author: false,
        parentId: null
    },
    {
        id: 4,
        content: "댓글입니당@@",
        likeCount: 12,
        createdAt: new Date(),
        memberId: 1,
        memberNickname: "버미",
        memberImageUrl: null,
        replyCount: 2,
        modified: true,
        likedMe: true,
        author: true,
        parentId: null
    },
];

// 조회
export const fetchComment = async (postId, lastCommentId) => {
    const mainComments = dummyCommentsData.filter(comment => comment.parentId === null);
    return {
        status: { code: 9999, message: "응답 성공" },
        comments: mainComments
    };
};

// 답글 조회
export const fetchReplyComment = async (commentId, lastCommentId) => {
    const replies = dummyCommentsData.filter(comment => comment.parentId === commentId);
    return {
        status: { code: 9999, message: "응답 성공" },
        comments: replies
    };
};

// 댓글 작성
export const createComment = async (postId, content) => {
    const newComment = {
        id: Date.now(),  // 임시 ID 생성
        content,
        likeCount: 0,
        createdAt: new Date(),
        memberId: 1,     // 현재 사용자 ID
        memberNickname: "버미",
        memberImageUrl: null,
        replyCount: 0,
        modified: false,
        likedMe: false,
        author: true,
        parentId: null
    };
    dummyCommentsData.unshift(newComment);
    return {
        status: { code: 9999, message: "응답 성공" },
        result: newComment
    };
};

// 답글 작성
export const createReplyComment = async (commentId, content) => {
    const newReply = {
        id: Date.now(),
        content,
        likeCount: 0,
        createdAt: new Date(),
        memberId: 1,
        memberNickname: "버미",
        memberImageUrl: null,
        replyCount: 0,
        modified: false,
        likedMe: false,
        author: true,
        parentId: commentId
    };
    dummyCommentsData.push(newReply);

    // 부모 댓글의 replyCount 증가
    const parentComment = dummyCommentsData.find(c => c.id === commentId);
    if (parentComment) parentComment.replyCount++;

    return {
        status: { code: 9999, message: "응답 성공" },
        result: newReply
    };
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
    dummyCommentsData = dummyCommentsData.filter(comment => comment.id !== commentId);
    return {
        status: { code: 9999, message: "응답 성공" }
    };
};

// 댓글 수정
export const editComment = async (commentId, content) => {
    const comment = dummyCommentsData.find(c => c.id === commentId);
    if (comment) {
        comment.content = content;
        comment.modified = true;
    }
    return {
        status: { code: 9999, message: "응답 성공" },
        result: comment
    };
};

// 좋아요 토글
export const likeComment = async (likeSet, commentId) => {
    const comment = dummyCommentsData.find(c => c.id === commentId);
    if (comment) {
        comment.likedMe = !comment.likedMe;
    }
    return {
        status: { code: 9999, message: "응답 성공" }
    };
};