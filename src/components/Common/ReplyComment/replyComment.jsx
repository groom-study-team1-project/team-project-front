import React, {useCallback, useEffect, useState} from "react";
import axiosInstance from "../../../services/axiosConfig";
import commentSubmit from "../../../assets/images/commentsubmit.png";
import {
    RepliesWrap,
    Reply,
    Nickname,
    ReplyContent,
    ReplyText,
    ReplyTimeText,
    EditReplyWrap,
    EditReplyInput,
    ReplyInputForm,
    ReplyInputWrap,
    ReplyInput
} from "./replyComment.style";
import {
    CommentButton,
    InputImg,
    CommnetModalIcon,
    TimeAndModal,
    TimeAndLike,
    IconWrap,
    LikedButton,
    CommentRight,
    SomeMoreCommentButton
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
    const {userInfo, isUserLoading, userError } = useUserInfo();
    const [repliesData, setRepliesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newReply, setNewReply] = useState(""); // 답글 입력
    const [editReplyId, setEditReplyId] = useState(null); // 답글 편집 아이디
    const [editReplyContent, setEditReplyContent] = useState(""); // 답글 편집 내용
    const [likedReply, setLikedReply] = useState(new Set()); // 답글 좋아요
    const [modalIndex, setModalIndex] = useState(null); // 수정, 삭제 모달
    const [isEndReply, setIsEndReply] = useState(false);

    const fetchReplyComments = useCallback(async (userInfo, lastCommentId) => {

        setIsLoading(true);

        const baseReplyEndPoint = `/open/comments/replies/${commentId}`;
        const queryParams = new URLSearchParams();
        const memberId = userInfo?.id;

        if (memberId) queryParams.append("memberId", memberId);
        if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);

        const replyEndPoint = queryParams.toString() ?
            `${baseReplyEndPoint}?${queryParams.toString()}` : baseReplyEndPoint;

        try {

            const response = await axiosInstance.get(replyEndPoint);
            const repliesInfo = response.data.result;

            console.log("답글 정보 : ", repliesInfo);

            if (repliesInfo && repliesInfo.length > 0) {
                setRepliesData((prev) =>
                    lastCommentId? [...prev, ...repliesInfo] : repliesInfo
                );

                if (lastCommentId) {
                    const newCommentCount = [...repliesData, ...repliesInfo].length;
                    if (newCommentCount >= 5) {
                        setIsEndReply(true);
                    } else {
                        if (repliesInfo.length >= 5) {
                            setIsEndReply(true);
                        }
                    }
                }
            }

            const likedComments = new Set(
                repliesInfo.filter(reply => reply.likedMe).map(reply => reply.id)
            );

            console.log("새로 생성된 likedReply 집합 : ", [...likedReply]);

            setLikedReply(likedComments);

            console.log("상태 업데이트 후 likedReply:", [...likedReply]);
        } catch (error) {
            console.error("답글 불러오기 실패 : ", error);
        } finally {
            console.log("답글 불러오기 성공");
            setIsLoading(false);
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

    const handleLike = async (commentId, userInfo) => {
        if (likedReply.has(commentId)) {
            await axiosInstance
                .post(`/api/comments/unlike`, {
                    targetId: commentId,
                })
                .then((response) => {
                    setLikedReply((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(commentId);
                        return newSet;
                    });
                    return fetchReplyComments(userInfo, null);
                })
                .catch((error) => {
                    console.error("좋아요를 취소하지 못하였습니다 : ", error);
                });
        } else {
            await axiosInstance
                .post(`/api/comments/like`, {
                    targetId: commentId,
                })
                .then(() => {
                    setLikedReply((prev) => new Set([...prev, commentId]));
                    return fetchReplyComments(userInfo, null);
                })
                .catch((error) => {
                    console.error("좋아요를 반영하지 못하였습니다 : ", error);
                });
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

    const onChange = (e) => setNewReply(e.target.value);

    const handleModalClose = () => setModalIndex(null);

    if (isLoading) return <div>Loading...</div>;

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
                                    {reply.author && (
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
                                    <LikedButton onClick={() => { handleLike(reply?.id, userInfo); }}>
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
                {!isEndReply ? (
                    <SomeMoreCommentButton onClick={() => {
                        const lastCommentId = repliesData[repliesData.length-1].id;
                        console.log("마지막 답글 Id : ", lastCommentId);
                        if (lastCommentId) {
                            fetchReplyComments(userInfo, lastCommentId);
                        }
                    }}>
                        더보기
                    </SomeMoreCommentButton>
                ) : (
                    <div style={{justifyContent : "center", width: "100%"}}>모든 댓글을 불러왔습니다.</div>
                )}
            </RepliesWrap>

            <ReplyInputForm onSubmit={handleSubmitReply}>
                <ReplyInputWrap>
                    <ReplyInput
                        value={newReply}
                        onChange={onChange}
                        placeholder="답글 작성"
                    />
                    <InputImg
                        src={commentSubmit}
                        alt="답글 제출"
                        onClick={handleSubmitReply}
                    />
                </ReplyInputWrap>
            </ReplyInputForm>
        </div>
    );
};

export default ReplyComment;