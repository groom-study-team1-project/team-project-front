import React, {useCallback, useEffect, useState} from "react";
import axiosInstance from "../../../services/axiosConfig";
import commentSubmit from "../../../assets/images/commentsubmit.png";
import {
    ReplyWrap, Reply, ReplyContent,
    ReplyInputWrap, ReplyInput, InputImg
} from "./replyComment.style";
import { ProfileImage } from "../../Card/PostCard/PostProfile";
import outlineHeart from "../../../assets/images/heart.png";
import fullHeart from "../../../assets/images/fullheart.png";

const ReplyComment = ({ commentId, replyAdded }) => {
    const [repliesData, setRepliesData] = useState([]);
    const [replyContent, setReplyContent] = useState("");
    const [likedReply, setLikedReply] = useState(new Set());
    const [modalIndex, setModalIndex] = useState(null);

    const fetchReplyComments = useCallback(() => {

        axiosInstance.get(`/comments/replies/${commentId}`)
            .then((response) => {
                setRepliesData(response.data.result);
                const likedSet = new Set(
                    response.data.result.filter(reply => reply.likedMe).map(reply => reply.id)
                );
                setLikedReply(likedSet);
            })
            .catch((error) => console.error("답글을 가져오지 못했습니다 : ", error));
    }, [commentId]);

    const handleSubmitReply = () => {
        if (!replyContent.trim()) return;

        const replyData = {
            commentId,
            content: replyContent.trim()
        };

        axiosInstance.post(`/api/comments/write/reply`, {replyData})
            .then((response) => {
                setReplyContent("");
                if(replyAdded) replyAdded();
                fetchReplyComments()
            }).catch(error => {
                console.error("답글 작성을 실패하였습니다 : ", error);
            }
        );
    };

    const handleDelete = () => {
        axiosInstance.delete(`/api/comments/reply/remove`)
            .then(() => {
                fetchReplyComments();
                setModalIndex(null);
            })
            .catch(error => {
                console.error("답글 삭제에 실패했습니다:", error);
            }
        );
    };

    useEffect(() => {
        fetchReplyComments();
    }, [fetchReplyComments]);

    const getReplyTime = (createdTime) => {
        const now = new Date();
        const created = new Date(createdTime);
        created.setHours(created.getHours() + 9);

        const differTime = Math.floor((now - created) / 1000);
        if (differTime < 60) return "now";

        const minutes = Math.floor(differTime / 60);
        if (minutes < 60) return `${minutes}minute ago`;

        const hours = Math.floor(differTime / (60 * 60));
        if (hours < 24) return `${hours}hour ago`;

        const days = Math.floor(differTime / (60 * 60 * 24));
        if (days < 7) return `${days}day ago`;

        const weeks = Math.floor(days / 7);
        if (days < 30) return `${weeks}week ago`;

        const months = Math.floor(days / 30);
        if (months < 12) return `${months}week ago`;

        const years = Math.floor(months / 12);
        return `${years}year ago`;
    }

    return (
        <div>
            {repliesData.map((reply, index) => (
                <ReplyWrap key={reply.id}>
                    <Reply>
                        <ProfileImage src={reply.memberImageUrl} />
                        <ReplyContent>
                            <div><strong>{reply.memberNickname}</strong></div>
                            <div>{reply.content}</div>
                            <div>
                                <small>{getReplyTime(reply.createdAt)}</small>
                                <button>
                                    <InputImg
                                        src={likedReply.has(reply.id) ? fullHeart : outlineHeart}
                                        alt="좋아요"
                                    />
                                    <span>{reply.likeCount}</span>
                                </button>
                            </div>
                        </ReplyContent>
                    </Reply>
                    {/*{reply.isModified && (
                        <div>
                            <button onClick={() => setModalIndex(index)}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>
                    )}*/}
                </ReplyWrap>
            ))}

            <form onSubmit={handleSubmitReply}>
                <ReplyInputWrap>
                    <ReplyInput
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="답글 작성"
                    />
                    <InputImg
                        src={commentSubmit}
                        alt="답글 제출"
                        onClick={handleSubmitReply}
                    />
                </ReplyInputWrap>
            </form>
        </div>
    );
};

export default ReplyComment;