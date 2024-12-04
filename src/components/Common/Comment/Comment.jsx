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

    return (
        <CommentWrapper>
            <div className="previousComments">
                {comments.map((comment) => (
                    <div>
                        <div>
                            <small><img src={userInfo.imageUrl} alt="프로필"/></small>
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