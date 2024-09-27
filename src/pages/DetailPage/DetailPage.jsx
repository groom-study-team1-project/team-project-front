import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Slide from "../../components/Common/imgSlide";
import heart from "../../assets/images/heart.png";
import commentsubmit from "../../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  createComment,
  fetchComment,
  editComment,
  deleteComment,
} from "../../services/commentApi";
import { fetchPostdetail, deletepost } from "../../services/postApi";
import {
  PostProfileBox,
  ProfileImage,
} from "../../components/Card/PostCard/PostProfile";
import {
  Interaction,
  InteractionItem,
} from "../../components/Common/Interactions";
import { Wrap } from "../../components/WriteBoard/WriteBoard.style";
import {
  CategotyWrap,
  CenteredContainer,
  PostWrap,
  Postheader,
  PostheaderRignt,
  Modify,
  ModalBackground,
  Modal,
  CommentModal,
  CommentEditModal,
  CommentModalBackground,
  Title,
  PostFooter,
  CommentsWrap,
  CommetHr,
  Comment,
  CommentProfile,
  CommentText,
  Bold,
  CommentRight,
  TimeAndLike,
  IconWrap,
  CommentModalIcon,
  CommentInputWrap,
  CommentInput,
  InputImg,
} from "./DetailPage.style";

function DetailPage() {
  const [post, setPost] = useState(null);
  const [commentsData, setCommentData] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [modalcurrent, setModalcurrnet] = useState(false);
  const [commentmodalcurrent, setCommentModalcurrent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [checkCommentInfo, setCheckCommentInfo] = useState("");
  const [editCommentValue, setEditCommentValue] = useState("");
  const [replyData, setReplyData] = useState(null);
  const [replyValue, setReplyValue] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [checkReplyInfo, setCheckReplyInfo] = useState("");
  const [editReplyValue, setEditReplyValue] = useState("");

  const modalRef = useRef(null);
  const commentModalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetchPostdetail();
        const commentsResponse = await fetchComment();

        setPost(postResponse);
        setCommentData(commentsResponse);
      } catch (error) {
        console.error("데이터를 가져오는데 실패", error);
      }
    };
    fetchData();
  }, []);

  const onCommentSubmit = async (e) => {
    await e.preventDefault();
    const body = { commentValue };
    await createComment(body);
  };

  const onReplySubmit = async (e) => {
    await e.preventDefault();
    const body = { replyValue };
    await createReply(body);
  };

  const onCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onReplyChange = (e) => {
    setReplyValue(e.target.value);
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
                              navigate(`/editpost/${1}`);
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
                          {/* 수정 제출 버튼 */}
                          <InputImg
                            src={commentsubmit}
                            alt="댓글 수정 제출"
                            onClick={async () => {
                              await editComment({
                                content: editCommentValue,
                              }); // 수정된 내용 전달
                              setIsEditing(false); // 수정 모드 종료
                            }}
                          />
                        </div>
                      ) : (
                        <div>{commentData.commentInfo.content}</div> // 조건이 일치하지 않을 때 원래 댓글 내용 표시
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
                        count={commentData.commentInfo.recommendCount}
                      />
                    </IconWrap>
                  </TimeAndLike>
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
                                    setIsReply(true);
                                    setCommentModalcurrent(false);
                                  }}
                                >
                                  댓글작성
                                </div>
                                <hr style={{ margin: "0px", padding: "0px" }} />
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
                                <hr style={{ margin: "0px", padding: "0px" }} />
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
            ))}
            <hr />
            <form>
              {isReply ? (
                <CommentInputWrap>
                  <CommentInput
                    value={replyValue}
                    onChange={onReplyChange}
                    placeholder="대댓글 작성"
                  />
                  <InputImg
                    src={commentsubmit}
                    alt="대댓글 제출"
                    onClick={onReplySubmit}
                  />
                </CommentInputWrap>
              ) : (
                <CommentInputWrap>
                  <CommentInput
                    value={commentValue}
                    onChange={onCommentChange}
                    placeholder="댓글 작성"
                  />
                  <InputImg
                    src={commentsubmit}
                    alt="댓글 제출"
                    onClick={onCommentSubmit}
                  />
                </CommentInputWrap>
              )}
            </form>
          </CommentsWrap>
        </Wrap>
      </CenteredContainer>
    </>
  );
}

export default DetailPage;
