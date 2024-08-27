import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled, { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

const GlobalStyle = createGlobalStyle`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
    margin-bottom: 20px;
  }
`;

const Wrap = styled.div`
  width: 1028px;
  margin: auto auto;
  font-size: 16px;
`;

const WriteWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 111px;
  margin-bottom: 41px;
`;

const BackImg = styled.img`
  width: 40px;
  height: 40px;
`;
const Write = styled.div`
  font-size: 40px;
`;
const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Titleinput = styled.input`
  width: 732px;
  height: 43px;
  border-radius: 10px;
  border: 1px solid black;
  margin-bottom: 32px;
`;

const Categoryselect = styled.select`
  width: 196px;
  height: 43px;
  border: 1px solid black;
  border-radius: 10px;
`;

const Hashtag = styled.input`
  border: none;
`;

const SubmitBtnWrap = styled.div`
  float: right;
`;

const SubmitBtn = styled.button`
  margin-left: 16px;
  width: 132px;
  height: 40px;
  border-radius: 10px;
  background: ${(props) => props.$bgColor};
  cursor: pointer;
  border-color: ${(props) => props.$borderColor};
`;

const ImgWrap = styled.div`
  display: flex;
  background: #efefef;
  margin-bottom: 16px;
  padding: 10px;
  overflow-x: auto; /* Enable horizontal scrolling */
  white-space: nowrap; /* Prevent images from wrapping to the next line */
`;

const ImgPreview = styled.img`
  object-fit: cover;
  width: 288px;
  height: 160px;
  margin-right: 10px;
  margin-bottom: 10px; /* Space between images in case they wrap to the next line */
`;

const ImgAdd = styled.div`
  width: 288px;
  height: 160px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ccc;
  position: relative;
`;

function BoardWrite() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imgUrls, setImgUrls] = useState([]); // State to store multiple image URLs
  const fileInput = useRef(null);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClickImgadd = () => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImgUrls = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImgUrls.push(reader.result); // Add to newImgUrls array
        if (newImgUrls.length === files.length) {
          setImgUrls((prevImgUrls) => [...prevImgUrls, ...newImgUrls]); // Append new images to the existing array
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <GlobalStyle />
      <Wrap>
        <WriteWrap>
          <BackImg
            src={require("../assets/images/back-removebg-preview.png")}
            alt="뒤로 가기"
            onClick={() => {
              navigate(-1);
            }}
          />
          <Write>글 쓰기</Write>
        </WriteWrap>
        <form>
          <TitleWrap>
            <span>
              <Titleinput type="text" placeholder="제목을 입력하세요" />
            </span>
            <span>
              <Categoryselect
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="free">자유 게시판</option>
                <option value="questions">질문 게시판</option>
                <option value="project">프로젝트 자랑 게시판</option>
                <option value="notice">공지 게시판</option>
              </Categoryselect>
            </span>
          </TitleWrap>
          {selectedCategory === "project" && (
            <ImgWrap>
              {imgUrls.map((url, index) => (
                <ImgPreview key={index} src={url} alt={`Preview ${index}`} />
              ))}
              <ImgAdd onClick={handleClickImgadd}>
                <FontAwesomeIcon
                  icon={faPhotoFilm}
                  style={{ fontSize: "24px" }}
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  ref={fileInput}
                  multiple
                  onChange={handleFileChange}
                />
              </ImgAdd>
            </ImgWrap>
          )}
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "내용을 입력하세요.",
            }}
            data=""
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          <Hashtag type="text" placeholder="#태그입력" />
          <SubmitBtnWrap>
            <SubmitBtn $borderColor="#929292" $bgColor="transparent">
              임시저장
            </SubmitBtn>
            <SubmitBtn $borderColor="#86FDE8" $bgColor="#86FDE8">
              확인
            </SubmitBtn>
          </SubmitBtnWrap>
        </form>
      </Wrap>
    </>
  );
}

export default BoardWrite;
