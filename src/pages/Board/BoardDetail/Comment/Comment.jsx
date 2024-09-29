import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProfileImage } from "../../../../components/Card/PostCard/PostProfile";
import { InteractionItem } from "../../../../components/Common/Interactions";
import heart from "../../../../assets/images/heart.png";
import commentsubmit from "../../../../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { createcomment, fetchcomment } from "../../../../services/api/api";
import { Modify } from "../Board/BoardDetail.style";
import ModalComponent from "../../../../components/Modal/EditDeleteModal/EditDeleteModal"; // 모달 컴포넌트 추가
import {
  CommentsWrap,
  CommetHr,
  Comment,
  CommentText,
  Bold,
  CommentRight,
  TimeAndLike,
  IconWrap,
  CommnetModalIcon,
  CommentInputWrap,
  CommentInput,
  InputImg,
  CommentWrap,
} from "./Coment.style";

const Comments = () => {
  const [commentValue, setCommentValue] = useState("");
  const [commentsData, setCommentData] = useState(null);
  const [modalIndex, setModalIndex] = useState(null); // 클릭된 댓글의 인덱스
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsResponse = await fetchcomment();
        setCommentData(commentsResponse);
      } catch (error) {
        console.error("데이터를 가져오는데 실패", error);
      }
    };
    fetchData();
  }, [postId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { commentValue };
    await createcomment(body);
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleModalClose = () => setModalIndex(null);
  const handleEdit = () => {
    console.log("댓글 수정");
    setModalIndex(null);
  };
  const handleDelete = () => {
    console.log("댓글 삭제");
    setModalIndex(null);
  };

  if (!commentsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CommentsWrap>
        <div>
          <span style={{ fontSize: "24px" }}>댓글</span>
          <span>{commentsData.result.length}</span>
        </div>

        <CommetHr />
        {commentsData.result.map((commentData, index) => (
          <CommentWrap key={index}>
            <Comment>
              <ProfileImage />
              <CommentText>
                <Bold>{commentData.memberInfo.nickname}</Bold>
                <div>{commentData.commentInfo.content}</div>
              </CommentText>
            </Comment>
            <CommentRight>
              <TimeAndLike>
                <div>{commentData.commentInfo.createdAt}</div>
                <IconWrap>
                  <InteractionItem
                    icon={heart}
                    count={commentData.commentInfo.recommedCount}
                  />
                </IconWrap>
              </TimeAndLike>

              {commentData.commentInfo.isModified && (
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
        <form onSubmit={onSubmit}>
          <CommentInputWrap>
            <CommentInput
              value={commentValue}
              onChange={onChange}
              placeholder="댓글 작성"
            />
            <InputImg src={commentsubmit} alt="댓글 제출" onClick={onSubmit} />
          </CommentInputWrap>
        </form>
      </CommentsWrap>
    </div>
  );
};

export default Comments;
