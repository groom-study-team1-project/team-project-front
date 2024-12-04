import React, {useState} from "react";
import axiosInstance from "../../../services/axiosConfig";

const ReplyComment = ({ comment }) => {
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

export default ReplyComment;