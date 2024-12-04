import React, { useState, useCallback, useEffect } from 'react';
import {
    CommentWrapper,
} from "./Comment.style";
import axiosInstance from "../../../services/axiosConfig";
import useUserInfo from "../../../hooks/useUserInfo";

function Comment({ postId }) {

    const { userInfo, userError } = useUserInfo();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyError, setReplyError] = useState(false);

    const fetchComment = useCallback(() => {
       setReplyError(null);

       axiosInstance.get(`api/comments/${postId}`)
           .then(response => { setComments(response.data); })
           .catch(error => {
               setReplyError(error.message);
               console.error("댓글을 불러오는데 실패했습니다: ", error)
           })
    }, [postId]);

    useEffect(() => {
        fetchComment();
    }, [fetchComment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentData = {
            postId,
            content: newComment
        };

        axiosInstance.post(`/api/comments/write`, commentData)
            .then(() => {
                setNewComment("");
                fetchComment();
            })
            .catch(error => { console.error("댓글 작성을 하지 못하였습니다: ", error); });

        const comment = {
            id : Date.now(),
            text : newComment,
            date : new Date()
        };

        setComments([...comments, comment]);
        setNewComment("");
    }

    const replyItem = ({ comment }) => {
        const [isEdit, setIsEdit] = useState(false);
        const [editContent, setEditContent] = useState(comment.content);
        const [showReplyInput, setShowReplyInput] = useState(false);
        const [replyContent, setReplyContent] = useState("");

        const handleDelete = () => {
            axiosInstance.delete(`/api/comments/remove`)
                .then(() => fetchComment())
                .catch(error => { console.error("댓글 삭제를 하지 못하였습니다 : ", error); });
        };

        const handleEdit = (commentId, content) => {
            axiosInstance.post(`/api/comments/edit`, { content })
                .then(() => { fetchComment(); })
                .catch(error => { console.error("댓글 수정을 하지 못하였습니다 : ", error); });
        };

        const handleReplySubmit = () => {
            if (!replyContent.trim()) return;

            axiosInstance.post(`/api/comments/write/reply`, {
                postId : replyContent?.id,
                content: replyContent
            }).then(() => {
                setReplyContent("");
                setShowReplyInput(false);
                fetchComment();
            }).catch(error => {
                console.error("답글 작성을 실패하였습니다 : ", error);
            });
        };

        return (
            <div className="comment-item">
                <div className="comment-header">
                    <img src={comment.author?.imageUrl || userInfo?.imageUrl} alt="프로필"/>
                    <span>{comment.author?.name || userInfo?.name}</span>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>

                {isEditing ? (
                    <div>
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <button onClick={handleEdit}>수정완료</button>
                        <button onClick={() => setIsEditing(false)}>취소</button>
                    </div>
                ) : (
                    <div>
                        <p>{comment.content}</p>
                        <div className="comment-actions">
                            <button onClick={() => setShowReplyInput(!showReplyInput)}>답글</button>
                            <button onClick={() => setIsEditing(true)}>수정</button>
                            <button onClick={() => handleDelete(comment.id)}>삭제</button>
                        </div>
                    </div>
                )}

                {showReplyInput && (
                    <div className="reply-input">
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="답글을 작성하세요..."
                        />
                        <button onClick={handleReplySubmit}>답글 작성</button>
                    </div>
                )}

                {comment.replies?.map(reply => (
                    <CommentItem key={reply.id} comment={reply} />
                ))}
            </div>
        );
    };

    return (
        <CommentWrapper>
            <div className="previousComments">
                {comments.map((comment) => (
                    <div>
                        <div>
                            <small><img src={userInfo?.imageUrl} alt="프로필"/></small>
                            <small>{userInfo.name}</small>
                        </div>
                        <div>
                            <small>{comment.date.toString()}</small>
                        </div>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <img src={userInfo.imageUrl} />
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="write your opinion..."
                />

                <button
                    type="submit"
                >작성
                </button>
            </form>
        </CommentWrapper>
    );
}

export default Comment;