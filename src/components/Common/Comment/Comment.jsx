import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import axiosInstance from "../../../services/axiosConfig";
import {
    Bold,
    CommentInput,
    CommentInputWrap,
    CommentRight,
    CommentsWrap,
    Comment,
    CommentText,
    CommentWrap,
    CommentButton,
    CommetHr,
    CommnetModalIcon,
    IconWrap,
    InputImg,
    TimeAndLike,
    LikedButton,
    ReplyButton,
    EditCommentWrap,
    CommentInputForm,
    TimeAndModal,
    CommentBox,
    ReplyList
} from "../Comment/Comment.style";
import { ProfileImage } from "../../Card/PostCard/PostProfile";
import { Modify } from "../../../pages/Board/BoardDetail/Board/BoardDetail.style";
import ModalComponent from "../../Modal/EditDeleteModal/EditDeleteModal";
import commentsubmit from "../../../assets/images/commentsubmit.png";
import ReplyComment from "../ReplyComment/replyComment";
import useUserInfo from "../../../hooks/useUserInfo";

const Comments = () => {
    const { userInfo, isUserInfoLoading, userError } = useUserInfo();
    const { postId } = useParams();
    const [commentsData, setCommentsData] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [modalIndex, setModalIndex] = useState(null);
    const [commentError, setCommentError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState("");

    const [likedComment, setLikedComment] = useState(new Set());
    const [openReply, setOpenReply] = useState(new Set());

    const fetchComment = useCallback(
        async (userInfo, lastCommentId) => {
            setIsLoading(true);

            const memberId = userInfo?.id;
            const baseEndpoint = `/open/comments/${postId}`;
            const queryParams = new URLSearchParams();

            if (memberId) queryParams.append("memberId", memberId);
            if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);

            const endpoint = queryParams.toString() ?
                `${baseEndpoint}?${queryParams.toString()}`
                : baseEndpoint;

            try {
                const response = await axiosInstance.get(endpoint);
                const commentInfo = response.data.result;
                console.log(commentInfo)
                setCommentsData((prev) =>
                    lastCommentId? [...prev, ...commentInfo] : commentInfo
                );

                const likeComment = new Set(
                    commentInfo.filter((comment) => comment.likedMe).map((comment) => comment.id)
                );

                setLikedComment((prev) => new Set([...prev, ...likeComment]));
                setCommentError(false);
                console.log("댓글을 불러오는데 성공하였습니다.");

            } catch (error) {
                setCommentError(error.message);
                console.error("댓글을 불러올 수 없습니다 : ", error);
            } finally {
                setIsLoading(false);
            }
        }, [postId]
    );

    useEffect(() => {
        if (!isUserInfoLoading) {
            fetchComment(userInfo, null);
        }
    }, [userInfo, isUserInfoLoading, fetchComment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentData = {
            postId: parseInt(postId),
            content: newComment.trim(),
        };

        try {
            await axiosInstance.post(`/api/comments/write`, commentData);
            setNewComment("");
            fetchComment(userInfo, null);
        } catch (error) {
            console.error("댓글 작성을 하지 못하였습니다 : ", error);
        } finally {
            console.log("댓글 전송 작업을 종료하였습니다.");
        }
    };

    const getTime = (createdTime) => {
        const now = new Date();
        const created = new Date(createdTime);
        created.setHours(created.getHours() + 9);

        const differTime = Math.floor((now - created) / 1000);
        if (differTime < 60) return "now";

        const minutes = Math.floor(differTime / 60);
        if (minutes < 60) return `${minutes}분 전`;

        const hours = Math.floor(differTime / (60 * 60));
        if (hours < 24) return `${hours}시간 전`;

        const days = Math.floor(differTime / (60 * 60 * 24));
        if (days < 7) return `${days}일 전`;

        const weeks = Math.floor(days / 7);
        if (days < 30) return `${weeks}주 전`;

        const months = Math.floor(days / 30);
        if (months < 12) return `${months}달 전`;

        const years = Math.floor(months / 12);
        return `${years}년 전`;
    };

    const handleLike = async (commentId, userInfo) => {
        if (likedComment.has(commentId)) {
            await axiosInstance
                .post(`/api/comments/unlike`, {
                    targetId: commentId,
                })
                .then((response) => {
                    setLikedComment((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(commentId);
                        return newSet;
                    });
                    return fetchComment(userInfo, null);
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
                    setLikedComment((prev) => new Set([...prev, commentId]));
                    return fetchComment(userInfo, null);
                })
                .catch((error) => {
                    console.error("좋아요를 반영하지 못하였습니다 : ", error);
                });
        }
    };

    const onChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleDelete = async (commentId) => {
        try {
            await axiosInstance.delete(`/api/comments/remove`, {
                data : { commentId : commentId },
            });
            fetchComment(userInfo, null);
            setModalIndex(null);
        } catch (error) {
            console.error("댓글 삭제를 하지 못하였습니다 : ", error);
        } finally {
            console.log("댓글 삭제 작업이 끝났습니다.");
        }
    };

    const handleEdit = (commentId, content) => {
        setEditCommentId(commentId);
        setEditCommentContent(content);
    };

    const handleEditSubmit = async (commentId) => {

        try {
            await axiosInstance.post(`/api/comments/edit`, {
                commentId : commentId,
                content : editCommentContent.trim()
            });
            setEditCommentId(null);
            setEditCommentContent("");
            fetchComment(userInfo, null);
            setModalIndex(null);
        } catch (error) {
            console.error("댓글 수정을 하지 못하였습니다. : ", error);
        } finally {
            console.log("댓글 수정 작업 종료");
        }
    };

    const handleEditCancel = () => {
        setEditCommentId(null);
        setEditCommentContent("");
    };

    const handleModalClose = () => setModalIndex(null);

    const handleReplyOpen = (commentId) => {
        setOpenReply((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (commentError) return <div>Error: {commentError}</div>;

    return (
        <div>
            <CommentsWrap>
                <div>
                    <span style={{ fontSize: "24px", paddingRight: "0.5rem" }}>댓글</span>
                    <span>{commentsData.length}</span>
                </div>

                <CommetHr />
                {commentsData?.map((commentData, index) => (
                    <CommentWrap key={commentData.id}>
                        <CommentBox>
                            <Comment>
                                <ProfileImage src={commentData.memberImageUrl}></ProfileImage>
                                <CommentText>
                                    <Bold>{commentData.memberNickname}</Bold>
                                    {editCommentId === commentData.id ? (
                                        <EditCommentWrap>
                                            <CommentInput
                                                value={editCommentContent}
                                                onChange={(e) => setEditCommentContent(e.target.value)}
                                            />
                                            <CommentButton
                                                onClick={() =>
                                                    handleEditSubmit(commentData.id, commentData.content)
                                                }
                                            >
                                                수정
                                            </CommentButton>
                                            <CommentButton onClick={handleEditCancel}>
                                                취소
                                            </CommentButton>
                                        </EditCommentWrap>
                                    ) : (
                                        <>
                                            <p>{commentData.content}</p>
                                            <ReplyButton
                                                onClick={() => handleReplyOpen(commentData.id)}
                                            >
                                                답글
                                            </ReplyButton>
                                        </>
                                    )}
                                </CommentText>
                            </Comment>
                            <CommentRight>
                                <TimeAndLike>
                                    <TimeAndModal>
                                        <div>{getTime(commentData.createdAt)}</div>
                                        {!commentData.author && (
                                            <CommnetModalIcon>
                                                <Modify onClick={() => setModalIndex(commentData.id)}>
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                </Modify>
                                                {modalIndex === commentData.id && (
                                                    <ModalComponent
                                                        isVisible={true}
                                                        onClose={() => handleModalClose(commentData.id)}
                                                        onEdit={() => {
                                                            console.log(
                                                                "수정 대상 게시글 : ",
                                                                commentData.id,
                                                                commentData.content
                                                            );
                                                            handleEdit(commentData.id, commentData.content);
                                                        }}
                                                        onDelete={() => {
                                                            console.log(
                                                                "삭제할 게시글 아이디 : ",
                                                                commentData.id
                                                            );
                                                            handleDelete(commentData.id);
                                                        }}
                                                    />
                                                )}
                                            </CommnetModalIcon>
                                        )}
                                    </TimeAndModal>
                                    <IconWrap>
                                        <LikedButton onClick={() => handleLike(commentData.id)}>
                                            {likedComment.has(commentData.id) ? (
                                                <FontAwesomeIcon
                                                    icon={solidHeart}
                                                    style={{ color: "#ff1900" }}
                                                    size="2xl"
                                                />
                                            ) : (
                                                <FontAwesomeIcon icon={regularHeart} size="2xl" />
                                            )}
                                        </LikedButton>
                                        <span>{commentData.likeCount}</span>
                                    </IconWrap>
                                </TimeAndLike>
                            </CommentRight>
                        </CommentBox>
                        <ReplyList>
                            {openReply.has(commentData.id) && (
                                <ReplyComment
                                    commentId={commentData.id}
                                    getReplyTime={getTime}
                                    handleLike={handleLike}
                                />
                            )}
                        </ReplyList>
                    </CommentWrap>
                ))}
                <hr />
                <CommentInputForm onSubmit={handleSubmit}>
                    <CommentInputWrap>
                        <CommentInput
                            value={newComment}
                            onChange={onChange}
                            placeholder="댓글 작성"
                        />
                        <InputImg
                            src={commentsubmit}
                            alt="댓글 제출"
                            onClick={handleSubmit}
                        />
                    </CommentInputWrap>
                </CommentInputForm>
            </CommentsWrap>
        </div>
    );
};

export default Comments;