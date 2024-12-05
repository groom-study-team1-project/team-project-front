import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InteractionItem } from "../Interactions";
import heart from "../../../assets/images/heart.png";
import commentSubmitButton from "../../../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import {
    CommentWrapper,
} from "./Comment.style";
import axiosInstance from "../../../services/axiosConfig";
import useUserInfo from "../../../hooks/useUserInfo";
import {fetchcomment} from "../../../services/api/api";
import {
    Bold, CommentInput, CommentInputWrap, CommentRight,
    CommentsWrap, Comment, CommentText, CommentWrap,
    CommetHr, CommnetModalIcon, IconWrap, InputImg, TimeAndLike
} from "../Comment/Comment.style";
import {ProfileImage} from "../../Card/PostCard/PostProfile";
import {Modify} from "../../../pages/Board/BoardDetail/Board/BoardDetail.style";
import ModalComponent from "../../Modal/EditDeleteModal/EditDeleteModal";
import commentsubmit from "../../../assets/images/commentsubmit.png";
import comment from "../../../pages/Board/BoardDetail/Comment/Comment";

const Comments = ()  => {

    const { postId} = useParams();
    const [commentsData, setCommentsData] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [modalIndex, setModalIndex] = useState(null);
    const [replyError, setReplyError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchComments = useCallback(() => {
        setIsLoading(true);
        axiosInstance
            .get(`/comments/${postId}`)
            .then((response) => {
                console.log(response.data.result)
                setCommentsData(response.data.result);
                setReplyError(false);
            })
            .catch((error) => {
                setReplyError(error.message);
                console.error("댓글을 불러오는데 실패했습니다: ", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentData = {
            postId: parseInt(postId),
            content: newComment.trim()
        };

        axiosInstance
            .post(`/api/comments/write`, commentData)
            .then(() => {
                setNewComment("");
                fetchComments();
            })
            .catch((error) => {
                console.error("댓글 작성을 하지 못하였습니다: ", error);
            });
    };

    const onChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleModalClose = () => setModalIndex(null);
    const handleEdit = () => setModalIndex(null);
    const handleDelete = () => setModalIndex(null);

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
                            <ProfileImage />
                            <CommentText>
                                <Bold>{commentData.memberNickName}</Bold>
                                <div>{commentData.content}</div>
                            </CommentText>
                        </Comment>
                        <CommentRight>
                            <TimeAndLike>
                                <div>{commentData.createdAt}</div>
                                <IconWrap>
                                    <InteractionItem
                                        icon={heart}
                                        count={commentData.likeCount || 0}
                                    />
                                </IconWrap>
                            </TimeAndLike>

                            {commentData?.commentInfo?.isModified && (
                                <CommnetModalIcon>
                                    <Modify onClick={() => setModalIndex(index)}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </Modify>
                                    {modalIndex !== null && (
                                        <ModalComponent
                                            isVisible={modalIndex !== null}
                                            onClose={handleModalClose}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
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