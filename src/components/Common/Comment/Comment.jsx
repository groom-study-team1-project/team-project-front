import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { InteractionItem } from "../Interactions";
import outlineHeart from "../../../assets/images/heart.png";
import fullHeart from "../../../assets/images/fullheart.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../services/axiosConfig";
import {
    Bold, CommentInput, CommentInputWrap, CommentRight,
    CommentsWrap, Comment, CommentText, CommentWrap,
    CommetHr, CommnetModalIcon, IconWrap, InputImg, TimeAndLike, LikedButton, ReplyButton
} from "../Comment/Comment.style";
import {ProfileImage} from "../../Card/PostCard/PostProfile";
import {Modify} from "../../../pages/Board/BoardDetail/Board/BoardDetail.style";
import ModalComponent from "../../Modal/EditDeleteModal/EditDeleteModal";
import commentsubmit from "../../../assets/images/commentsubmit.png";
import ReplyComment from "../ReplyComment/replyComment";
import useUserInfo from "../../../hooks/useUserInfo";

const Comments = ()  => {
    const { userInfo, isUserInfoLoading } = useUserInfo();
    const { postId} = useParams();
    const [commentsData, setCommentsData] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [modalIndex, setModalIndex] = useState(null);
    const [replyError, setReplyError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //const [isEdit, setIsEdit] = useState(false);
    //const [editContent, setEditContent] = useState("");
    //const [heart, setHeart] = useState(false);

    const [likedComment, setLikedComment] = useState(new Set());
    const [openReply, setOpenReply] = useState(new Set());

    const fetchComments = useCallback((userInfo, lastCommentId) => {

        setIsLoading(true);

        const memberId = userInfo?.id
        const baseEndpoint = `/comments/${postId}`;
        const queryParams = new URLSearchParams();

        if (memberId) queryParams.append("memberId", memberId);
        if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);

        const endPoint = queryParams.toString() ? `${baseEndpoint}?${queryParams.toString()}` : baseEndpoint;
        console.log("최종 : ", endPoint);
        axiosInstance.get(endPoint)
            .then((response) => {
                const commentInfo = response.data.result;

                setCommentsData(prev => lastCommentId ? [...prev, ...commentInfo] : commentInfo);

                const likedComment = new Set(
                    commentInfo
                        .filter(comment => comment.likedMe)
                        .map(comment => comment.id)
                );
                setLikedComment(prev => new Set([...prev, ...likedComment]));
                setReplyError(false);
            })
            .catch((error) => {
                setReplyError(error.message);
                console.error("댓글을 불러오는데 실패했습니다: ", error);
            })
            .finally(() => {
                setIsLoading(false);
                console.log("댓글 불러오기 성공");
            });
    }, [postId]);

    useEffect(() => {
        if (!isUserInfoLoading) {
            fetchComments(userInfo, null);
        }
    }, [userInfo, isUserInfoLoading, fetchComments]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentData = {
            postId: parseInt(postId),
            content: newComment.trim()
        };

        axiosInstance.post(`/api/comments/write`, commentData)
            .then(() => {
                setNewComment("");
                fetchComments();
            })
            .catch((error) => {
                console.error("댓글 작성을 하지 못하였습니다: ", error);
            });
    };

    const getTime = (createdTime) => {
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

    const handleHeart = (commentId) => {
        if (likedComment.has(commentId)) {
            axiosInstance.delete(`/api/comments/unlike`)
                .then((response) => {
                    setLikedComment(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(commentId);
                        return newSet;
                    });
                    return fetchComments();
                })
                .catch((error) => {
                    console.error("좋아요를 취소하지 못하였습니다 : ", error);
                });
        } else {
            axiosInstance.post(`/api/comments/like`)
                .then(() => {
                    setLikedComment(prev => new Set([...prev, commentId]));
                    return fetchComments();
                })
                .catch((error) => {
                    console.error("좋아요를 반영하지 못하였습니다 : ", error);
                });
        }
    };

    const onChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleDelete = () => {
        axiosInstance.delete(`/api/comments/remove`)
            .then(() => {
                fetchComments(userInfo, null);
                setModalIndex(null);
            })
            .catch(error => { console.error("댓글 삭제를 하지 못하였습니다 : ", error); });
    };

    const handleEdit = (commentId, content) => {
        axiosInstance.post(`/api/comments/edit`, {
            commentId: commentId,
            content: content
        })
            .then(() => {
                fetchComments(userInfo, null);
                setModalIndex(null);
            })
            .catch(error => { console.error("댓글 수정을 하지 못하였습니다 : ", error); });
    };

    const handleModalClose = () => setModalIndex(null);

    const handleReplyOpen = (commentId) => {
        setOpenReply(prev => {
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
    if (replyError) return <div>Error: {replyError}</div>;

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
                        <Comment>
                            <ProfileImage src={commentData.memberImageUrl}></ProfileImage>
                            <CommentText>
                                <Bold>{commentData.memberNickname}</Bold>
                                <p>{commentData.content}</p>
                                <ReplyButton onClick={() => handleReplyOpen(commentData.id)}>답글</ReplyButton>
                                {openReply.has(commentData.id) && (
                                    <ReplyComment
                                        commentId={commentData.id}
                                        replyAdded={fetchComments}
                                    />
                                )}
                            </CommentText>
                        </Comment>
                        <CommentRight>
                        <TimeAndLike>
                                <div>{getTime(commentData.createdAt)}</div>
                                <IconWrap>
                                    <div>
                                        <LikedButton onClick={() => handleHeart(commentData.id)}>
                                            <img src={likedComment.has(commentData.id) ? fullHeart : outlineHeart} alt="좋아요"/>
                                        </LikedButton>
                                        <span>{commentData.likeCount}</span>
                                    </div>
                                </IconWrap>
                            </TimeAndLike>

                            {commentData.author && (
                                <CommnetModalIcon>
                                    <Modify onClick={() => setModalIndex(commentData.id)}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </Modify>
                                    {modalIndex === commentData.id && (
                                        <ModalComponent
                                            isVisible={true}
                                            onClose={() => handleModalClose(commentData.id)}
                                            onEdit={(content) => handleEdit(commentData.id, content)}
                                            onDelete={() => handleDelete(commentData.id)}
                                        />
                                    )}
                                </CommnetModalIcon>
                            )}
                        </CommentRight>
                    </CommentWrap>
                ))}
                <hr />
                <form onSubmit={handleSubmit}>
                    <CommentInputWrap>
                        <CommentInput
                            value={newComment}
                            onChange={onChange}
                            placeholder="댓글 작성"
                        />
                        <InputImg src={commentsubmit} alt="댓글 제출" onClick={handleSubmit} />
                    </CommentInputWrap>
                </form>
            </CommentsWrap>
        </div>
    );
};

export default Comments;