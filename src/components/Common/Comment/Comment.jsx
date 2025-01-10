import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import axiosInstance from "../../../services/axiosConfig";
import {
    CommentsWrap,
    CommentTitle,
    Bold,
    CommentInput,
    CommentInputWrap,
    CommentHr,
    CommentRight,
    Comment,
    CommentText,
    CommentWrap,
    CommentButton,
    CommnetModalIcon,
    IconWrap,
    InputImg,
    TimeAndLike,
    LikedButton,
    ReplyButton,
    EditCommentWrap,
    EditCommentInput,
    CommentInputForm,
    TimeAndModal,
    CommentBox,
    ReplyList,
    SomeMoreCommentButton
} from "../Comment/Comment.style";
import {
    fetchCommentList,
    handleCreateComment,
    handleDeleteComment,
    handleEditComment,
    handleLikeComment,
    setEditComment,
    clearEditComment,
    toggleReply,
    initializeCommentCount,
} from '../../../store/comment/commentSlice';
import { ProfileImage } from "../../Card/PostCard/PostProfile";
import { Modify } from "../../../pages/Board/BoardDetail/Board/BoardDetail.style";
import ModalComponent from "../../Modal/EditDeleteModal/EditDeleteModal";
import commentsubmit from "../../../assets/images/commentsubmit.png";
import ReplyComment from "../ReplyComment/replyComment";
import useUserInfo from "../../../hooks/useUserInfo";

const Comments = ({ commentCount }) => {
    const dispatch = useDispatch();
    const { userInfo, isUserInfoLoading } = useUserInfo();
    const { postId } = useParams();
    const [newComment, setNewComment] = useState("");
    const [modalIndex, setModalIndex] = useState(null);

    const {
        comments,
        isLoading,
        error,
        likeComments,
        openReplies,
        isEndComment,
        editCommentId,
        editCommentContent

    } = useSelector(state => state.comments);

    useEffect(() => {
        if (!isUserInfoLoading && userInfo) {
            dispatch(fetchCommentList(postId));
            dispatch(initializeCommentCount(commentCount));
        }
    }, [dispatch, userInfo, isUserInfoLoading, postId, commentCount]);

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

    const handleModalClose = () => setModalIndex(null);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <CommentsWrap>
                <CommentTitle>
                    <span style={{ fontSize: "24px", paddingRight: "0.5rem" }}>댓글</span>
                    <span>{commentCount}</span>
                </CommentTitle>
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
                <CommentHr />
                {commentsData?.map((commentData, index) => (
                    <CommentWrap key={commentData.id}>
                        <CommentBox>
                            <Comment>
                                <ProfileImage src={commentData.memberImageUrl}></ProfileImage>
                                <CommentText>
                                    <Bold>{commentData.memberNickname}</Bold>
                                    {editCommentId === commentData.id ? (
                                        <EditCommentWrap>
                                            <EditCommentInput
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
                                        {commentData.author && (
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
                                        <LikedButton onClick={() => handleLike(commentData.id, userInfo)}>
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
                                />
                            )}
                        </ReplyList>
                    </CommentWrap>
                ))}
                {!isEndComment ? (
                    <SomeMoreCommentButton onClick={() => {
                        const lastCommentId = commentsData[commentsData.length-1].id;
                        if (lastCommentId) {
                            fetchComment(userInfo, lastCommentId);
                        }
                    }}>
                        더보기
                    </SomeMoreCommentButton>
                ) : (
                    <div>모든 댓글을 불러왔습니다.</div>
                )}
            </CommentsWrap>
        </div>
    );
};

export default Comments;