import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Slide from "../components/Layout/imgSlide";
import comment from "../assets/images/comment.png";
import eye from "../assets/images/eye.png";
import heart from "../assets/images/heart.png";
import profileIcon from "../assets/images/profileIcon.png";
import fetchInmgUrl from "../services/api";
import commentsubmit from "../assets/images/commentsubmit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

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
`;
const Title = styled.div`
  font-size: 24px;
`;

const IconsWrap = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;
const IconWrap = styled.div`
  margin-right: 16px;
`;
const Icon = styled.img`
  width: 16px;
  align-items: center;
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
  const SlideImg = fetchInmgUrl();
  const [commentValue, setCommentValue] = useState("");
  const onSubmit = async (e) => {
    await e.preventDefault();
    const body = {};
  };
  const onChange = (e) => {
    setCommentValue(e.target.value);
  };
  return (
    <>
      <Wrap>
        <CategotyWrap>게시판 이름</CategotyWrap>

        <PostWrap>
          <Profile>
            <ProfileImg src={profileIcon} alt="프로필 이미지" />
            <div>
              <div>작성자 이름</div>
              <div>작성자 소개</div>
            </div>
          </Profile>
          <div>
            <Slide imgUrls={SlideImg} />
          </div>
          <Title>UI Templates</Title>
          <CKEditor
            editor={ClassicEditor}
            data={
              "<p>My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video. My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video. My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video.My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video. My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. </p>"
            }
            config={{
              toolbar: [],
            }}
            disabled={true}
          />
        </PostWrap>
        <IconsWrap>
          <IconWrap>
            <Icon src={eye} alt="조회수" />
            {" 12"}
          </IconWrap>
          <IconWrap>
            <Icon src={heart} alt="좋아요" />
            {" 12"}
          </IconWrap>
          <IconWrap>
            <Icon src={comment} alt="댓글수" />
            {" 12"}
          </IconWrap>
        </IconsWrap>
        <CommentsWrap>
          <div style={{ fontSize: "24px" }}>댓글</div>
          <CommetHr />
          <CommentWrap>
            <Comment>
              <ProfileImg
                src={profileIcon}
                alt="프로필 이미지"
                style={{ marginTop: "20px" }}
              />
              <CommentText>
                <b>{"user name"}</b>
                <div>{"prepared a report"}</div>
              </CommentText>
            </Comment>
            <TimeAndLike>
              <div>{new Date().toLocaleDateString()}</div>
              <IconWrap>
                <Icon src={heart} alt="좋아요" />
                {" 12"}
              </IconWrap>
            </TimeAndLike>
          </CommentWrap>
          <CommentWrap>
            <Comment>
              <ProfileImg
                src={profileIcon}
                alt="프로필 이미지"
                style={{ marginTop: "20px" }}
              />
              <CommentText>
                <b>{"user name"}</b>
                <div>{"prepared a report"}</div>
              </CommentText>
            </Comment>
            <TimeAndLike>
              <div>{new Date().toLocaleDateString()}</div>
              <IconWrap>
                <Icon src={heart} alt="좋아요" />
                {" 12"}
              </IconWrap>
            </TimeAndLike>
          </CommentWrap>
          <CommentWrap>
            <Comment>
              <ProfileImg
                src={profileIcon}
                alt="프로필 이미지"
                style={{ marginTop: "20px" }}
              />
              <CommentText>
                <b>{"user name"}</b>
                <div>{"prepared a report"}</div>
              </CommentText>
            </Comment>
            <TimeAndLike>
              <div>{new Date().toLocaleDateString()}</div>
              <IconWrap>
                <Icon src={heart} alt="좋아요" />
                {" 12"}
              </IconWrap>
            </TimeAndLike>
          </CommentWrap>
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
