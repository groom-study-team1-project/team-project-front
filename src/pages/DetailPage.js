import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Slide from "../components/Layout/imgSlide";
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
  border-radius: 50%;
`;

const PostWrap = styled.div`
  background: black;
  padding: 100px;
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
      <Wrap>
        <CategotyWrap>게시판 이름</CategotyWrap>
        <div>
          <Profile>
            <ProfileImg
              src={require("../assets/images/profileIcon.png")}
              alt="프로필 이미지"
            />
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
            disabled={false}
            styled={{ margintop: "100px" }}
          />
        </div>
        <div>
          <div>
            <img src={require("../assets/images/eye.png")} alt="조회수" />
            12
          </div>
          <div>
            <img src={require("../assets/images/heart.png")} alt="좋아요" />
            12
          </div>
          <div>
            <img src={require("../assets/images/comment.png")} alt="댓글수" />
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
