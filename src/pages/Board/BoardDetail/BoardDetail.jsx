import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Slide from "../../../components/Common/imgSlide";
import heart from "../../../assets/images/heart.png";
import fullheart from "../../../assets/images/fullheart.png";
import commentsubmit from "../../../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { commentsLike, commentsUnlike } from "../../../services/commentApi";
import {
  fetchComment,
  createComment,
  editComment,
  deleteComment,
} from "../../../services/commentApi";
import { fetchPostDetail } from "../../../services/postApi";
import {
  PostProfileBox,
  ProfileImage,
} from "../../../components/Card/PostCard/PostProfile";
import {
  Interaction,
  InteractionItem,
} from "../../../components/Common/Interactions";
import { Wrap } from "../BoardWrite/BoardWrite.style";
import { deletepost } from "../../../services/postApi";
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
  CommentProfile,
  CommentModal,
  CommentEditModal,
  CommentModalBackground,
  CommentModalIcon,
  CommentInputWrap,
  CommentInput,
  InputImg,
} from "./BoardDetail.style";

function BoardDetail() {
  const [post, setPost] = useState(null);
  const [commentsData, setCommentData] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [modalcurrent, setModalcurrnet] = useState(false);
  const [commentmodalcurrent, setCommentModalcurrent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [checkCommentInfo, setCheckCommentInfo] = useState("");
  const [editCommentValue, setEditCommentValue] = useState("");
  const [isLikeTrue, setIsLikeTrue] = useState(false);

  const modalRef = useRef(null);
  const commentModalRef = useRef(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetchPostDetail(postId);
        const commentsResponse = await fetchComment();

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
    await createComment(body);
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalcurrnet(false);
    } else if (
      commentModalRef.current &&
      !commentModalRef.current.contains(e.target)
    ) {
      setCommentModalcurrent(false);
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
                  <CommentProfile>
                    <ProfileImage />
                    <CommentText>
                      <Bold>{commentData.memberInfo.nickname}</Bold>
                      {isEditing ? (
                        commentData.memberInfo.Id === checkCommentInfo ? (
                          <div>
                            <input
                              type="text"
                              value={editCommentValue}
                              onChange={(e) =>
                                setEditCommentValue(e.target.value)
                              }
                              onKeyDown={async (e) => {
                                if (e.key === "Enter") {
                                  await editComment({
                                    content: editCommentValue,
                                  });
                                  setIsEditing(false);
                                  setCommentModalcurrent(false);
                                }
                              }}
                              placeholder="댓글 수정"
                            />

                            <InputImg
                              src={commentsubmit}
                              alt="댓글 수정 제출"
                              onClick={async () => {
                                await editComment({
                                  content: editCommentValue,
                                });
                                setIsEditing(false);
                              }}
                            />
                          </div>
                        ) : (
                          <div>{commentData.commentInfo.content}</div>
                        )
                      ) : (
                        <div>{commentData.commentInfo.content}</div>
                      )}
                    </CommentText>
                  </CommentProfile>

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
                    //
                    {commentData.commentInfo.isModified && (
                      <CommentModalIcon>
                        <Modify
                          onClick={() => {
                            setCommentModalcurrent(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </Modify>

                        {commentmodalcurrent && (
                          <CommentModalBackground>
                            {isEditing ? null : (
                              <CommentModal ref={commentModalRef}>
                                <>
                                  <div
                                    onClick={() => {
                                      setIsEditing(true);
                                      setEditCommentValue(
                                        commentData.commentInfo.content
                                      );
                                      setCheckCommentInfo(
                                        commentData.memberInfo.Id
                                      );
                                      setCommentModalcurrent(false);
                                    }}
                                  >
                                    수정
                                  </div>
                                  <hr
                                    style={{ margin: "0px", padding: "0px" }}
                                  />
                                  <div
                                    onClick={() => {
                                      deleteComment();
                                      setCommentModalcurrent(false);
                                    }}
                                  >
                                    삭제
                                  </div>
                                </>
                              </CommentModal>
                            )}
                          </CommentModalBackground>
                        )}
                      </CommentModalIcon>
                    )}
                  </CommentRight>
                </Comment>
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

export default BoardDetail;
