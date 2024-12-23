import React, {useCallback, useEffect, useState} from "react";
import axiosInstance from "../../../services/axiosConfig";
import commentSubmit from "../../../assets/images/commentsubmit.png";
import {
    RepliesWrap, Reply, Nickname, ReplyContent, ReplyText, ReplyTimeText, EditReplyWrap, EditReplyInput
} from "./replyComment.style";
import {
    CommentButton, CommentInput, CommentInputForm, CommentInputWrap,
    InputImg, CommnetModalIcon, TimeAndModal,
    TimeAndLike, IconWrap, LikedButton, CommentRight
} from "../Comment/Comment.style";
import { ProfileImage } from "../../Card/PostCard/PostProfile";
import useUserInfo from "../../../hooks/useUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {Modify} from "../../../pages/Board/BoardDetail/Board/BoardDetail.style";
import ModalComponent from "../../Modal/EditDeleteModal/EditDeleteModal";

const ReplyComment = ({ commentId, getReplyTime }) => {
    const userInfo = useUserInfo();
    const [repliesData, setRepliesData] = useState([]);
    const [newReply, setNewReply] = useState(""); // 답글 입력
    const [editReplyId, setEditReplyId] = useState(null); // 답글 편집 아이디
    const [editReplyContent, setEditReplyContent] = useState(""); // 답글 편집 내용
    const [likedReply, setLikedReply] = useState(new Set()); // 답글 좋아요
    const [modalIndex, setModalIndex] = useState(null); // 수정, 삭제 모달

    const fetchReplyComments = useCallback(async (userInfo, lastCommentId) => {

        const baseReplyEndPoint = `/open/comments/replies/${commentId}`;
        const queryParams = new URLSearchParams();
        const memberId = userInfo?.id;

        if (memberId) queryParams.append("memberId", memberId);
        //if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);

        const replyEndPoint = queryParams.toString() ?
            `${baseReplyEndPoint}?${queryParams.toString()}` : baseReplyEndPoint;

        try {
            const response = await axiosInstance.get(replyEndPoint);
            const repliesInfo = response.data.result;
            setRepliesData((prev) =>
                lastCommentId ? [...prev, ...repliesInfo] : repliesInfo
            );

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
        fetchReplyComments(userInfo, null);
    }, [fetchReplyComments]);

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        if (!newReply.trim()) return;

        const replyData = {
            commentId : commentId,
            content: newReply.trim()
        };

        try {
            await axiosInstance.post(`/api/comments/write/reply`, replyData);
            setNewReply("");
            fetchReplyComments(userInfo, null);
        } catch (error) {
            console.error("답글 작성을 실패하였습니다 : ", error);
        }
    };

    /*const handleDelete = () => {
        axiosInstance.delete(`/api/comments/remove`)
            .then(() => {
                fetchReplyComments(userInfo, null);
                setModalIndex(null);
            })
            .catch(error => {
                console.error("답글 삭제에 실패했습니다:", error);
            }
        );
    };*/

    const handleDelete = async (commentId) => {

        const commentData = {
            commentId : commentId
        }

        try {
            await axiosInstance.delete(`/api/comments/remove`, {
                data: commentData
            });
            fetchReplyComments(userInfo, null);
            setModalIndex(null);
        } catch (error) {
            console.error("답글 삭제를 실패하였습니다 : ", error);
        }
    }

    const editReplySubmit = async (commentId, content) => {

        const editReplyData = {
            commentId: commentId,
            content: content.trim()
        };

        try {

            await axiosInstance.post(`/api/comments/edit`, editReplyData);

            setEditReplyId(null);
            setEditReplyContent("");
            fetchReplyComments(userInfo, null);
            setModalIndex(null);

        } catch (error) {
            console.error("답글 수정을 하지 못하였습니다 : ", error);
        }
    };

    const handleReplyEdit = (commentId, content) => {
        setEditReplyId(commentId);
        setEditReplyContent(content);
    }

    const editReplyCancel = () => {
        setEditReplyId(null);
        setEditReplyContent("");
    }

    const handleLike = async (userInfo, commentId) => {
        const baseLikeEndPoint = `/api/comments`

        if(!likedReply.has(commentId)) {
            try {
                await axiosInstance.post(`${baseLikeEndPoint}/like`, {
                    targetId: commentId
                });
                setLikedReply(prev => new Set([...prev, commentId]));
                fetchReplyComments(userInfo, null);
            } catch (error) {
                console.error("좋아요를 누를 수 없습니다 : ", error);
            }
        } else {
            try {
                await axiosInstance.post(`${baseLikeEndPoint}/unlike`, {
                    targetId: commentId
                });
                setLikedReply(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(commentId);
                    return newSet;
                });
                fetchReplyComments(userInfo, null);
            } catch (error) {
                console.error("좋아요 취소를 하지 못하였습니다 : ", error);
            }
        }
    }

    const onChange = (e) => setNewReply(e.target.value);

    const handleModalClose = () => setModalIndex(null);

    return (
        <div>
            <RepliesWrap>
                {repliesData.map((reply, index) => (
                        <Reply key={reply.id}>
                            <ProfileImage src={reply.memberImageUrl} />
                            <ReplyContent>
                                {editReplyId === reply.id ? (
                                    <>
                                        <EditReplyWrap>
                                            <EditReplyInput
                                                value={editReplyContent}
                                                onChange = {(e) => setEditReplyContent(e.target.value)}
                                            />
                                            <CommentButton
                                                onClick={() => editReplySubmit(reply.id, editReplyContent)}
                                            >
                                                수정
                                            </CommentButton>
                                            <CommentButton
                                                onClick = {editReplyCancel}
                                            >
                                                취소
                                            </CommentButton>
                                        </EditReplyWrap>
                                    </>
                                ) : (
                                    <>
                                        <Nickname>{reply.memberNickname}</Nickname>
                                        <ReplyText>{reply.content}</ReplyText>
                                    </>
                                )}
                            </ReplyContent>

                            <CommentRight>
                                <TimeAndLike>
                                    <TimeAndModal>
                                        <ReplyTimeText>{getReplyTime(reply.createdAt)}</ReplyTimeText>
                                        {!reply.author && (
                                            <CommnetModalIcon>
                                                <Modify onClick={() => setModalIndex(reply.id)}>
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                </Modify>
                                                {modalIndex === reply.id && (
                                                    <ModalComponent
                                                        isVisible={true}
                                                        onClose={() => handleModalClose(reply.id)}
                                                        onEdit={() => {
                                                            console.log(
                                                                "수정 대상 게시글 : ",
                                                                reply.id,
                                                                reply.content
                                                            );
                                                            handleReplyEdit(reply.id, reply.content);
                                                        }}
                                                        onDelete={() => {
                                                            console.log(
                                                                "삭제할 게시글 아이디 : ",
                                                                reply.id
                                                            );
                                                            handleDelete(reply.id);
                                                        }}
                                                    />
                                                )}
                                            </CommnetModalIcon>
                                        )}
                                    </TimeAndModal>
                                    <IconWrap>
                                        <LikedButton onClick={() => handleLike(reply.id)}>
                                            {likedReply.has(reply.id) ? (
                                                <FontAwesomeIcon
                                                    icon={solidHeart}
                                                    style={{ color: "#ff1900" }}
                                                    size="2xl"
                                                />
                                            ) : (
                                                <FontAwesomeIcon icon={regularHeart} size="2xl" />
                                            )}
                                        </LikedButton>
                                        <span>{reply.likeCount}</span>
                                    </IconWrap>
                                </TimeAndLike>
                            </CommentRight>
                        </Reply>
                ))}
            </RepliesWrap>

            <CommentInputForm onSubmit={handleSubmitReply}>
                <CommentInputWrap>
                    <CommentInput
                        value={newReply}
                        onChange={onChange}
                        placeholder="답글 작성"
                    />
                    <InputImg
                        src={commentSubmit}
                        alt="답글 제출"
                        onClick={handleSubmitReply}
                    />
                </CommentInputWrap>
            </CommentInputForm>
        </div>
    );
};

export default ReplyComment;