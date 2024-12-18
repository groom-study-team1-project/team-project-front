import React, {useCallback, useEffect, useState} from "react";
import axiosInstance from "../../../services/axiosConfig";
import commentSubmit from "../../../assets/images/commentsubmit.png";
import {
    RepliesWrap, Reply, Nickname, ReplyContent, ReplyText,
    ReplyRight, ReplyLike, ReplySubmitButton, InputImg,
    ReplyInputWrap, ReplyInput
} from "./replyComment.style";
import { ProfileImage } from "../../Card/PostCard/PostProfile";
import outlineHeart from "../../../assets/images/heart.png";
import fullHeart from "../../../assets/images/fullheart.png";
import useUserInfo from "../../../hooks/useUserInfo";

const ReplyComment = ({ commentId, getReplyTime }) => {
    const userInfo = useUserInfo();
    const [repliesData, setRepliesData] = useState([]);
    const [replyContent, setReplyContent] = useState("");
    const [likedReply, setLikedReply] = useState(new Set());
    const [modalIndex, setModalIndex] = useState(null);

    const baseReplyEndPoint = `/comments/replies/${commentId}`;
    const queryParams = new URLSearchParams();
    const memberId = userInfo?.id;

    if (memberId) queryParams.append("memberId", memberId);
    //if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);

    const replyEndPoint = queryParams.toString() ?
        `${baseReplyEndPoint}?${queryParams.toString()}` : baseReplyEndPoint;

    const fetchReplyComments = useCallback(async () => {
        try {
            const response = await axiosInstance.get(replyEndPoint);
            setRepliesData(response.data.result);
            console.log(repliesData);
            const likedReplySet = new Set (
                response.data.result.filter(reply => reply.likedMe).map(reply => reply.id)
            );
            setLikedReply(likedReplySet);
        } catch (error) {
            console.error("답글 불러오기 실패 : ", error);
        } finally {
            console.log("답글 불러오기 성공");
        }
    }, [commentId]);

    useEffect(() => {
        fetchReplyComments();
    }, [fetchReplyComments]);

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        if (!replyContent.trim()) return;

        const replyData = {
            commentId : commentId,
            content: replyContent.trim()
        };

        try {
            await axiosInstance.post(`/api/comments/write/reply`, replyData);
            setReplyContent("");
            fetchReplyComments();
        } catch (error) {
            console.error("답글 작성을 실패하였습니다 : ", error);
        }
    };

    const handleDelete = () => {
        axiosInstance.delete(`/api/comments/remove`)
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

    return (
        <div>
            <RepliesWrap>
                {repliesData.map((reply, index) => (
                        <Reply key={reply.id}>
                            <ProfileImage src={reply.memberImageUrl} />
                            <ReplyContent>
                                <Nickname>{reply.memberNickname}</Nickname>
                                <ReplyText>{reply.content}</ReplyText>
                                <ReplyRight>
                                    <small>{getReplyTime(reply.createdAt)}</small>
                                    <ReplySubmitButton>
                                        <InputImg
                                            src={likedReply.has(reply.id) ? fullHeart : outlineHeart}
                                            alt="좋아요"
                                        />
                                        <ReplyLike>{reply.likeCount}</ReplyLike>
                                    </ReplySubmitButton>
                                </ReplyRight>
                            </ReplyContent>
                        </Reply>
                ))}
            </RepliesWrap>

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