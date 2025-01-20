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
    setUIState,

} from '../../../store/comment/commentSlice';
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {Modify} from "../../../pages/Board/BoardDetail/Board/BoardDetail.style";
import ModalComponent from "../../Modal/EditDeleteModal/EditDeleteModal";
import {useDispatch, useSelector} from "react-redux";
import {fetchReplyComment} from "../../../services/api/mockCommentApi";

const ReplyComment = ({ commentId, getReplyTime }) => {
    const dispatch = useDispatch();
    const { userInfo, isUserInfoLoading } = useUserInfo();
    const [modalIndex, setModalIndex] = useState(null);
    const [editReplyId, setEditReplyId] = useState(null);
    const [editReplyContent, setEditReplyContent] = useState("");
    const [newReply, setNewReply] = useState("");
    const [replyReloaded, setReplyReloaded] = useState(false);

    const replies = useSelector(state => state.comments.replies[commentId] || []);
    const isLoading = useSelector(state => state.comments.isLoading);
    const error = useSelector(state => state.comments.error);
    const isEndComment = useSelector(state => state.comments.isEndComment);

    /*useEffect(() => {
        if (!isUserInfoLoading && userInfo) {
            dispatch(fetchCommentList(commentId));
            dispatch(initializeCommentCount(commentCount));
        }
    }, [dispatch, userInfo, isUserInfoLoading, postId, commentCount]);*/

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        if (!newReply.trim()) return;

        const writeReply = await dispatch(createReplyThunk(commentId, newReply.trim()));
        if (writeReply) setNewReply("");
    }

    const handleEditReply = async (commentId) => {
        if (!editReplyContent.trim()) return;
        const success = await dispatch(submitEditCommentThunk(commentId, editReplyContent.trim()));
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

        const handleMoreReply = async (commentId, lastCommentId) => {
            /* 댓글 컴포넌트에서 토글과 동시에 조회가 되도록 하여 답글 부분에서 더보기를 실행할 경우에는
            따로 답글조회 함수를 새로 생성해서 이용해야 되는거야?
            dispatch(fetchReplyList(commentId, lastCommentId));
            */
            await fetchReplyComment(commentId, lastCommentId);
            const minReplyId = Math.min(...replies.map(comment => comment.id));

            if (lastCommentId === minReplyId) {
                dispatch(setUIState({ isEndComment : true }));
            }
        };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <RepliesWrap>
                {replies.map((reply, index) => (
                    <Reply key={reply.id}>
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
                                            onClick={() => handleEditReply(reply.id, editReplyContent)}
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
                                                        handleEditReply(reply.id, reply.content);
                                                    }}
                                                    onDelete={() => {
                                                        console.log(
                                                            "삭제할 게시글 아이디 : ",
                                                            reply.id
                                                        );
                                                        dispatch(deleteCommentThunk(reply.id));
                                                    }}
                                                />
                                            )}
                                        </CommnetModalIcon>
                                    )}
                                </TimeAndModal>
                                <IconWrap>
                                    <LikedButton onClick={() => { likeCommentThunk(reply?.id, userInfo); }}>
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
                    <SomeMoreReplyButton onClick={() => {
                        const lastCommentId = replies[replies.length - 1].id;
                        handleMoreReply(commentId, lastCommentId);
                    }}>
                        더보기
                    </SomeMoreReplyButton>
                ) : (
                    <div style={{alignItems : "center", width: "100%"}}> </div>
                )}
            </RepliesWrap>

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
        </div>
    );
};

export default ReplyComment;