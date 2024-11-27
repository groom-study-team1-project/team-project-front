import React from 'react';
import {
    CommentWrapper,
} from "./Comment.style";
import useJwt from "../../../hooks/useJwt";
import {useSelector} from "react-redux";

function Comment({ postId }) {

     const payload = useJwt(
         useSelector((state) => state.user.userInfo.accessToken)
     );

    const memberId = payload.memberId;
    const userInfo = {
        imageUrl: payload.memberImageUrl,
    };
    const userName = payload.username;


    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState("");

    const fetchComment = React.useCallback(async () => {
        try {
            const response = await fetch(`/comments/${postId}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            throw new Error("댓글 불러오기 실패");
        }
    }, [postId]);

    React.useEffect(() => {
        fetchComment();
    }, [postId, fetchComment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id : Date.now(),
            text : newComment,
            date : new Date()
        };

        setComments([...comments, comment]);
        setNewComment("");
    }

    const handleSubmitButton = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <CommentWrapper>
            <div className="previousComments">
                {comments.map((comment) => (
                    <div>
                        <div>
                            <small><img src={userInfo.imageUrl} alt="프로필"/></small>
                            <small>{userInfo.n}</small>
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