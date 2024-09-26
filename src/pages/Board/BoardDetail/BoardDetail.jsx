import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import Slide from "../../../components/Common/imgSlide";
import heart from "../../../assets/images/heart.png";
import commentsubmit from "../../../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { fetchcomment, createcomment } from "../../../services/api";
import Navbar from "../../../Layout/Navbar/Navbar";
import { editorConfig } from "../BoardWrite/WriteBoard/editor";
import { fetchPostDetail } from "../../../services/postApi";
import {
  PostProfileBox,
  ProfileImage,
} from "../../../components/Card/PostCard/PostProfile";
import {
  Interaction,
  InteractionItem,
} from "../../../components/Common/Interactions";
import { deletepost } from "../../../services/postApi";
import {
  CategotyWrap,
  Wrap,
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
  CategoryTitle,
  CommentWrap,
} from "./BoardDetail.style";
import { ContentWrapper } from "../Board.style";
function BoardDetail() {
  const [post, setPost] = useState(null);
  const [commentsData, setCommentData] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [modalcurrent, setModalcurrnet] = useState(false);
  const [postData, setPostData] = useState("");
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetchPostDetail(postId);
        const commentsResponse = await fetchcomment();

        setPost(postResponse);
        setCommentData(commentsResponse);
        setPostData(postResponse.postInfo.content);
      } catch (error) {
        console.error("데이터를 가져오는데 실패", error);
      }
    };
    fetchData();
  }, [postId]);

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
      <ContentWrapper>
        <Wrap>
          <CategotyWrap>
            <CategoryTitle>{post.categoryInfo.title}</CategoryTitle>
          </CategotyWrap>

          <PostWrap>
            <Postheader>
              <PostProfileBox
                name={post.memberInfo.nickname}
                job={post.memberInfo.development}
                email={post.memberInfo.email}
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
                          <div
                            onClick={() => {
                              navigate(`/board/edit/${1}`);
                            }}
                          >
                            수정
                          </div>
                          <hr style={{ margin: "0px", padding: "0px" }} />
                          <div
                            onClick={() => {
                              deletepost(`${1}`);
                            }}
                          >
                            삭제
                          </div>
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
            {post.categoryInfo.title === "프로젝트 게시판" ? (
              <div>
                <Slide imgUrls={post.postInfo.imgUrl} />
              </div>
            ) : (
              ""
            )}

            <Title>{post.postInfo.title}</Title>
            <CKEditor
              editor={DecoupledEditor}
              config={editorConfig}
              data={postData}
              disabled={true}
            />
          </PostWrap>
          <PostFooter>
            <div>
              {post.postInfo.hashtags.map((hashtag, index) => (
                <span key={index}>{hashtag}</span>
              ))}
            </div>
            <Interaction
              count={{
                view: post.postInfo.viewCount,
                like: post.postInfo.recommedCount,
                comment: post.postInfo.commentCount,
              }}
            />
          </PostFooter>
          <CommentsWrap>
            <div>
              <span style={{ fontSize: "24px" }}>댓글</span>
              <span>{post.postInfo.commentCount}</span>
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
      </ContentWrapper>
    </>
  );
}

export default BoardDetail;
