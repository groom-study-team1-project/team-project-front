import React, { useRef, useState, useEffect } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Slide from "../../components/Common/imgSlide";
import heart from "../../assets/images/heart.png";
import commentsubmit from "../../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { fetchcomment, createcomment } from "../../services/api";
import { fetchPostdetail } from "../../services/postApi";
import {
  PostProfile,
  ProfileImage,
} from "../../components/Card/PostCard/PostProfile";
import {
  Interaction,
  InteractionItem,
} from "../../components/Common/Interactions";
import { Wrap } from "../../components/Common/WriteBoard/WriteBoard.style";
import {
  CategotyWrap,
  CenteredContainer,
  PostWrap,
  Postheader,
  PostheaderRignt,
  Modify,
  ModalBackground,
  Modal,
  Title,
  PostFooter,
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
} from "./DetailPage.style";

function DetailPage() {
  const [post, setPost] = useState(null);
  const [commentsData, setCommentData] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [modalcurrent, setModalcurrnet] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetchPostdetail();
        const commentsResponse = await fetchcomment();

        setPost(postResponse);
        setCommentData(commentsResponse);
      } catch (error) {
        console.error("데이터를 가져오는데 실패", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    await e.preventDefault();
    const body = { commentValue };
    await createcomment(body);
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalcurrnet(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!post || !commentsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CenteredContainer>
        <Wrap>
          <CategotyWrap>{post.categoryInfo.title}</CategotyWrap>

          <PostWrap>
            <Postheader>
              <PostProfile
                name={post.memberInfo.nickname}
                job={post.memberInfo.development}
              />
              <div>
                {post.postInfo.isModified ? (
                  <PostheaderRignt>
                    <div>{post.postInfo.createdAt}</div>
                    <Modify
                      onClick={() => {
                        setModalcurrnet(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </Modify>
                    {modalcurrent && (
                      <ModalBackground>
                        <Modal ref={modalRef}>
                          <div>수정</div>
                          <hr style={{ margin: "0px", padding: "0px" }} />
                          <div>삭제</div>
                        </Modal>
                      </ModalBackground>
                    )}
                  </PostheaderRignt>
                ) : (
                  <PostheaderRignt>
                    <div>{post.postInfo.createdAt}</div>
                  </PostheaderRignt>
                )}
              </div>
            </Postheader>
            {post.categoryInfo.title === "프로젝트 자랑 게시판" ? (
              <div>
                <Slide imgUrls={post.postInfo.imgUrl} />
              </div>
            ) : (
              ""
            )}

            <Title>{post.postInfo.title}</Title>
            <CKEditor
              editor={ClassicEditor}
              data={post.postInfo.content}
              config={{
                toolbar: [],
              }}
              disabled={true}
            />
          </PostWrap>
          <PostFooter>
            <div>
              {post.postInfo.hashtags.map((hashtag, index) => (
                <span key={index}>{hashtag}</span>
              ))}
            </div>
            <Interaction count={{ view: 12, like: 12, comment: 12 }} />
          </PostFooter>
          <CommentsWrap>
            <div style={{ fontSize: "24px" }}>댓글</div>
            <CommetHr />
            {commentsData.result.map((commentData, index) => (
              <CommentsWrap key={index}>
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
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </CommnetModalIcon>
                  )}
                </CommentRight>
              </CommentsWrap>
            ))}
            <hr />
            <form onSubmit={onSubmit}>
              <CommentInputWrap>
                <CommentInput
                  value={commentValue}
                  onChange={onChange}
                  placeholder="댓글 작성"
                />
                <InputImg
                  src={commentsubmit}
                  alt="댓글 제출"
                  onClick={onSubmit}
                />
              </CommentInputWrap>
            </form>
          </CommentsWrap>
        </Wrap>
      </CenteredContainer>
    </>
  );
}

export default DetailPage;
