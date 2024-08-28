import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Slide from "../components/Layout/imgSlide";
import comment from "../assets/images/comment.png";
import eye from "../assets/images/eye.png";
import heart from "../assets/images/heart.png";
import profileIcon from "../assets/images/profileIcon.png";
import commentsubmit from "../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { fetchPostdetail, fetchcomment } from "../services/api";

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
`;

const Modify = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
const Profile = styled.div`
  display: flex;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
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
const IconsWrap = styled.div`
  display: flex;
`;
const IconWrap = styled.div`
  margin-left: 16px;
`;
const Icon = styled.img`
  width: 16px;
`;
const CommetHr = styled.hr`
  width: 40%;
  float: left;
`;
const CommentsWrap = styled.div`
  margin-top: 50px;
`;
const CommentWrap = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
  border-radius: 15px;
  margin-top: 16px;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
`;

const CommentText = styled.div`
  margin-left: 10px;
`;

const TimeAndLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const CommentInputWrap = styled.div`
  position: relative;
  width: 100%;
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
function DetailPage() {
  const post = fetchPostdetail();
  const commentsData = fetchcomment();
  console.log(commentsData);
  const [commentValue, setCommentValue] = useState("");
  const onSubmit = async (e) => {
    await e.preventDefault();
    const body = { commentValue };
    console.log(body);
  };
  const onChange = (e) => {
    setCommentValue(e.target.value);
  };
  return (
    <>
      <Wrap>
        <CategotyWrap>{post.result.categoryInfo.title}</CategotyWrap>

        <PostWrap>
          <Postheader>
            <Profile>
              <ProfileImg src={profileIcon} alt="프로필 이미지" />
              <div>
                <div>
                  <b>{post.result.memberInfo.nickname}</b>
                </div>
                <div>{post.result.memberInfo.development}</div>
              </div>
            </Profile>
            <div>
              {post.result.postInfo.isModified ? (
                <PostheaderRignt>
                  <div>{post.result.postInfo.createdAt}</div>
                  <Modify>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </Modify>
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
          <IconsWrap>
            <IconWrap>
              <Icon src={eye} alt="조회수" />
              {` ${post.result.postInfo.viewCount}`}
            </IconWrap>
            <IconWrap>
              <Icon src={heart} alt="좋아요" />
              {` ${post.result.postInfo.recommedCount}`}
            </IconWrap>
            <IconWrap>
              <Icon src={comment} alt="댓글수" />
              {` ${post.result.postInfo.commentCount}`}
            </IconWrap>
          </IconsWrap>
        </PostFooter>
        <CommentsWrap>
          <div style={{ fontSize: "24px" }}>댓글</div>
          <CommetHr />
          {commentsData.result.map((commentData, index) => (
            <CommentWrap key={index}>
              <Comment>
                <ProfileImg
                  src={profileIcon}
                  alt="프로필 이미지"
                  style={{ marginTop: "20px" }}
                />
                <CommentText>
                  <b>{commentData.memberInfo.nickname}</b>
                  <div>{commentData.commentInfo.content}</div>
                </CommentText>
              </Comment>
              <TimeAndLike>
                <div>{commentData.commentInfo.createdAt}</div>
                <IconWrap>
                  <Icon src={heart} alt="좋아요" />
                  {` ${commentData.commentInfo.recommedCount}`}
                </IconWrap>
              </TimeAndLike>
            </CommentWrap>
          ))}
          <hr />
          <form onSubmit={onSubmit}>
            <CommentInputWrap>
              <CommentInput placeholder="댓글 작성" />
              <InputImg
                src={commentsubmit}
                alt="댓글 제출"
                onChange={onChange}
              />
            </CommentInputWrap>
          </form>
        </CommentsWrap>
      </Wrap>
    </>
  );
}

export default DetailPage;
