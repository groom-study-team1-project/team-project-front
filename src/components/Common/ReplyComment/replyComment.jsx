import React, {useCallback, useEffect, useState} from "react";
import commentSubmit from "../../../assets/images/commentsubmit.png";
import {
    RepliesWrap,
    Reply,
    Nickname,
    ReplyContent,
    ReplyText,
    ReplyTimeText,
    EditReplyWrap,
    ReplyInputForm,
    ReplyInputWrap,
    ReplyInput,
    ReplySubmitButton,
    SomeMoreReplyButton
} from "./replyComment.style";
import {
    CommentButton,
    CommnetModalIcon,
    TimeAndModal,
    TimeAndLike,
    IconWrap,
    LikedButton,
    CommentRight,
    EditCommentInput
} from "../Comment/Comment.style";
import { ProfileImage } from "../../Card/PostCard/PostProfile";
import useUserInfo from "../../../hooks/useUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
    fetchReplyList,
    createReplyThunk,
    deleteCommentThunk,
    submitEditCommentThunk,
    likeCommentThunk,
    unlikeCommentThunk,
    setUIState
} from '../../../store/comment/commentSlice';
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {Modify} from "../../../pages/Board/BoardDetail/Board/BoardDetail.style";
import ModalComponent from "../../Modal/EditDeleteModal/EditDeleteModal";
import {useDispatch, useSelector} from "react-redux";

const ReplyComment = ({ commentId, getReplyTime }) => {
    const dispatch = useDispatch();
    const { userInfo, isUserInfoLoading } = useUserInfo();
    const [modalIndex, setModalIndex] = useState(null);
    const [editReplyId, setEditReplyId] = useState(null);
    const [editReplyContent, setEditReplyContent] = useState("");
    const [newReply, setNewReply] = useState("");
    const [visibleCount, setVisibleCount] = useState(5);

    const replies = useSelector(state => state.comments.replies[commentId] || []);
    const isLoading = useSelector(state => state.comments.isLoading);
    const error = useSelector(state => state.comments.error);
    const isEndComment = useSelector(state => state.comments.isEndComment);

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        if (!newReply.trim()) return;

        try {
            dispatch(setUIState({ isLoading: true }));
            console.log("유저 정보 : ", userInfo);
            const success = await dispatch(createReplyThunk(commentId, newReply.trim(),
                userInfo.nickname, userInfo.imageUrl));
            if (success) {
                setNewReply("");
            }
        } catch (error) {
            console.error('Error creating comment:', error);
        } finally {
            dispatch(setUIState({ isLoading: false }));
        }
    };

    const handleEditReply = async (commentId) => {
        if (!editReplyContent.trim()) return;
        const success = await dispatch(submitEditCommentThunk(commentId, editReplyContent, false));
        if (success) {
            setEditReplyContent("");
            setEditReplyId(null);
            setModalIndex(null);
        }
    }

    const editReplyCancel = () => {
        setEditReplyId(null);
        setEditReplyContent("");
    }

    const onChange = (e) => setNewReply(e.target.value);

    const handleModalClose = () => setModalIndex(null);

    const handleMoreReply = async (data, commentId, lastCommentId) => {
        try {
            if (!lastCommentId) return;

            await dispatch(fetchReplyList(commentId, lastCommentId));
            setVisibleCount(prev => prev + 5);
            const remainReply = data.slice(visibleCount);

            if (remainReply.length < 5) {
                setUIState({ isEndComment: true});
            }

        } catch (error) {
            console.error("더보기 기능 실패 오류 : ", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <ReplyInputForm onSubmit={handleSubmitReply}>
                <ReplyInputWrap>
                    <ReplyInput
                        value={newReply}
                        onChange={onChange}
                        placeholder="답글 작성"
                    />
                    <ReplySubmitButton
                        src={commentSubmit}
                        alt="답글 제출"
                        onClick={handleSubmitReply}
                    />
                </ReplyInputWrap>
            </ReplyInputForm>
            <RepliesWrap>
                {replies.slice(0, visibleCount).map((reply, index) => (
                    <Reply key={index} index={reply.id}>
                        <ProfileImage src={reply.memberImageUrl} />
                        <ReplyContent>
                            {editReplyId === reply.id ? (
                                <>
                                    <EditReplyWrap>
                                        <EditCommentInput
                                            value={editReplyContent}
                                            onChange = {(e) => setEditReplyContent(e.target.value)}
                                        />
                                        <CommentButton
                                            onClick={(e) => handleEditReply(reply.id)}
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
                                                        setEditReplyId(reply.id);
                                                        setEditReplyContent(reply.content);
                                                        handleModalClose(reply.id);
                                                        setModalIndex(null);
                                                    }}
                                                    onDelete={() => {
                                                        console.log(
                                                            "삭제할 게시글 아이디 : ",
                                                            reply.id
                                                        );
                                                        dispatch(deleteCommentThunk(reply.id, false, reply.id));
                                                    }}
                                                />
                                            )}
                                        </CommnetModalIcon>
                                    )}
                                </TimeAndModal>
                                <IconWrap>
                                    <LikedButton onClick={(e) => {
                                        e.preventDefault();
                                        console.log("replyId : ", reply.id);
                                        reply.likedMe
                                            ? (dispatch(unlikeCommentThunk(reply.id, false)))
                                            : (dispatch(likeCommentThunk(reply.id, false)));
                                    }}>
                                        {reply.likedMe ? (
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
                {!isEndComment && replies.length > 5 && !isLoading ? (
                    <SomeMoreReplyButton onClick={(e) => {
                        e.preventDefault();
                        const lastCommentId = replies[visibleCount - 1]?.id;
                        handleMoreReply(replies, commentId, lastCommentId);
                    }}>
                        더보기
                    </SomeMoreReplyButton>
                ) : (
                    <div style={{alignItems : "center", width: "100%"}}> </div>
                )}
            </RepliesWrap>
        </div>
    );
};

export default ReplyComment;