import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Slide from "../components/Common/imgSlide";
import heart from "../assets/images/heart.png";
import commentsubmit from "../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { fetchPostdetail, fetchcomment, createcomment } from "../services/api";
import {
  PostProfile,
  ProfileImage,
} from "../components/Common/PostCardComponents";
import {
  Interaction,
  InteractionItem,
} from "../components/Common/Interactions";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Wrap = styled.div`
  width: 1028px;
  margin: auto auto;
  font-size: 16px;
`;

const CategotyWrap = styled.div`
  width: 260px;
  height: 54px;
  border: 1px solid black;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 130px;
  margin-right: -100px;
`;

const Postheader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostheaderRignt = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  width: 100px;
  margin-right: 10px;
`;

const Modify = styled.div`
  margin-left: 10px;
  cursor: pointer;
  position: relative;
`;

const PostWrap = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const IconWrap = styled.div`
  margin-top: 10px;
  margin-left: 16px;
`;

const CommetHr = styled.hr`
  width: 15%;
  float: left;
`;

const CommentsWrap = styled.div`
  margin-top: 50px;
`;

const CommentWrap = styled.div`
  width: 100%;
  height: 65px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
  border-radius: 15px;
  margin-bottom: 16px;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
`;

const CommentText = styled.div`
  margin-left: 10px;
`;

const CommentRight = styled.div`
  display: flex;
`;

const TimeAndLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentInputWrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 16px;
`;

const CommentInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 16px;
`;

const InputImg = styled.img`
  position: absolute;
  width: 17px;
  top: 10px;
  right: 0px;
  cursor: pointer;
`;

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Modal = styled.div`
  width: 80px;
  height: 40px;
  border: 1px solid black;
  border-radius: 10px;
  background: white;
  padding: 10px;
  position: absolute;
  top: 20px;
  left: 2px;
  div {
    cursor: pointer;
  }
`;
const Bold = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;
const CommnetModalIcon = styled.div`
  margin-left: 10px;
`;
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
          <CategotyWrap>{post.result.categoryInfo.title}</CategotyWrap>

          <PostWrap>
            <Postheader>
              <PostProfile
                name={post.result.memberInfo.nickname}
                job={post.result.memberInfo.development}
              />
              <div>
                {post.result.postInfo.isModified ? (
                  <PostheaderRignt>
                    <div>{post.result.postInfo.createdAt}</div>
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
                    <div>{post.result.postInfo.createdAt}</div>
                  </PostheaderRignt>
                )}
              </div>
            </Postheader>
            {post.result.categoryInfo.title === "프로젝트 자랑 게시판" ? (
              <div>
                <Slide imgUrls={post.result.postInfo.imgUrl} />
              </div>
            ) : (
              ""
            )}

            <Title>{post.result.postInfo.title}</Title>
            <CKEditor
              editor={ClassicEditor}
              data={post.result.postInfo.content}
              config={{
                toolbar: [],
              }}
              disabled={true}
            />
          </PostWrap>
          <PostFooter>
            <div>
              {post.result.postInfo.hashtags.map((hashtag, index) => (
                <span key={index}>{hashtag}</span>
              ))}
            </div>
            <Interaction count={{ view: 12, like: 12, comment: 12 }} />
          </PostFooter>
          <CommentsWrap>
            <div style={{ fontSize: "24px" }}>댓글</div>
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
                      <FontAwesomeIcon icon={faEllipsisVertical} />
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
