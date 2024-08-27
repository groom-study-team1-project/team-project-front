import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Slide from "../components/Layout/imgSlide";
import comment from "../assets/images/comment.png";
import eye from "../assets/images/eye.png";
import heart from "../assets/images/heart.png";
import profileIcon from "../assets/images/profileIcon.png";

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

const SlideImg = [
  {
    id: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6KVvlziiJYFxZZIq3Xc_dVuzIbSLrgvtHPA&s",
  },
  {
    id: 2,
    url: "https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2021/01/2021-graphic-design-banner.jpg",
  },
  {
    id: 3,
    url: "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/6H5a/image/VbC1Pts-64VW9-xWDV3qad5cLok.jpg",
  },
];

function DetailPage() {
  return (
    <>
      <CategotyWrap>게시판 이름</CategotyWrap>
      <Wrap>
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
          <CKEditor
            editor={ClassicEditor}
            data={"<p>Hello World</p>"}
            config={{
              toolbar: [],
            }}
            disabled={true}
          />
        </PostWrap>
        <div>
          <div>
            <img src={eye} alt="조회수" />
            12
          </div>
          <div>
            <img src={heart} alt="좋아요" />
            12
          </div>
          <div>
            <img src={comment} alt="댓글수" />
            12
          </div>
        </div>
        <div>
          <div>댓글</div>
        </div>
      </Wrap>
    </>
  );
}

export default DetailPage;
