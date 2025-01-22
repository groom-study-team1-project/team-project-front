let dummyCommentsData = [
    {
        id: 1,
        content: "댓글입니당@@",
        likeCount: 12,
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
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
    console.log(mainComments);
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

    console.log("추가 전 데이터 : ", dummyCommentsData)

    const newComment = {
        id: Date.now(),  // 임시 ID 생성
        content,
        likeCount: 0,
        createdAt: new Date().toISOString(),
        memberId: 1,     // 현재 사용자 ID
        memberNickname: "버미",
        memberImageUrl: null,
        replyCount: 0,
        modified: false,
        likedMe: false,
        author: true,
        parentId: null
    };

    dummyCommentsData = [newComment, ...dummyCommentsData];
    console.log("추가 후 데이터 : ", dummyCommentsData);

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
        createdAt: new Date().toISOString(),
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
    console.log('수정 요청된 ID:', commentId);
    console.log('현재 더미 데이터:', dummyCommentsData);

    const commentIndex = dummyCommentsData.findIndex(c => {
        console.log('비교:', c.id, commentId, c.id === commentId);
        return Number(c.id) === Number(commentId);  // 타입을 맞춰서 비교
    });

    console.log('찾은 인덱스:', commentIndex);

    if (commentIndex !== -1) {
        const updatedComment = {
            ...dummyCommentsData[commentIndex],
            content: content,
            modified: true
        };

        console.log('업데이트된 댓글:', updatedComment);

        dummyCommentsData = [
            ...dummyCommentsData.slice(0, commentIndex),
            updatedComment,
            ...dummyCommentsData.slice(commentIndex + 1)
        ];

        console.log('업데이트 후 더미 데이터:', dummyCommentsData);

        return {
            status: { code: 9999, message: "응답 성공" },
            result: updatedComment
        };
    }
}

export const likeComment = async (commentId) => {
    try {
        const comment = dummyCommentsData.findIndex(c => {
            console.log("좋아요 작업 댓글 아이디 : ", c?.id);
            return c?.id === commentId;
        });

        if (comment === -1) {
            return {
                status: { code: 4004, message: "댓글을 찾을 수 없습니다." }
            };
        }

        const commentData = dummyCommentsData[comment];

        console.log("좋아요 처리 전:", {
            id: commentData?.id,
            likedMe: commentData?.likedMe,
            likeCount: commentData?.likeCount
        });

        const updatedComment = {
            ...commentData,
            likedMe: !commentData.likedMe,
            likeCount: commentData.likeCount + 1
        };

        dummyCommentsData = [
            ...dummyCommentsData.slice(0, comment),
            updatedComment,
            ...dummyCommentsData.slice(comment + 1)
        ];

        console.log("좋아요 처리 후:", {
            id: updatedComment.id,
            likedMe: updatedComment.likedMe,
            likeCount: updatedComment.likeCount
        });

        return {
            status: {code: 9999, message: "좋아요 작업 성공"},
            result: updatedComment
        };

    } catch (error) {
        console.error("좋아요 처리 중 오류 발생:", error);
        return {
            status: { code: 5000, message: "좋아요 처리 중 오류가 발생했습니다." }
        };
    }
};

export const unLikeComment = async (commentId) => {
    try {
        const comment = dummyCommentsData.findIndex(c => {
            console.log("좋아요 작업 댓글 아이디 : ", c?.id);
            return c?.id === commentId;
        });

        if (comment === -1) {
            return {
                status: { code: 4004, message: "댓글을 찾을 수 없습니다." }
            };
        }

        const commentData = dummyCommentsData[comment];

        console.log("좋아요 처리 전:", {
            id: commentData?.id,
            likedMe: commentData?.likedMe,
            likeCount: commentData?.likeCount
        });

        const updatedComment = {
            ...commentData,
            likedMe: !commentData.likedMe,
            likeCount: commentData.likeCount - 1
        };

        dummyCommentsData = [
            ...dummyCommentsData.slice(0, comment),
            updatedComment,
            ...dummyCommentsData.slice(comment + 1)
        ];

        console.log("좋아요 처리 후:", {
            id: updatedComment.id,
            likedMe: updatedComment.likedMe,
            likeCount: updatedComment.likeCount
        });

        return {
            status: {code: 9999, message: "좋아요 작업 성공"},
            result: updatedComment
        };

    } catch (error) {
        console.error()
    }
}