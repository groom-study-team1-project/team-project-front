import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import GlobalStyle from "../assets/styles/GlobalStyle";

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
  const [form, setValue] = useState({ title: "", content: "", hasgtags: [] });
  const [selectedCategory, setSelectedCategory] = useState("자유게시판");
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
        newImgUrls.push(reader.result);
        if (newImgUrls.length === files.length) {
          setImgUrls((prevImgUrls) => [...prevImgUrls, ...newImgUrls]); // Append new images to the existing array
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handlehashtag = (e) => {
    const hashtagStr = e.target.value;
    const hashtagArray = hashtagStr
      .split(" ")
      .filter((item) => item.startsWith("#"));
    setValue({ ...form, hasgtags: hashtagArray });
  };

  const onChange = (e) => {
    setValue({ ...form, title: e.target.value });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, content, hasgtags } = form;
    let body = {};
    if (selectedCategory === "프로젝트 자랑 게시판") {
      body = { title, content, hasgtags, selectedCategory, imgUrls };
    } else {
      body = { title, content, hasgtags, selectedCategory };
    }
    console.log(body);
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
        <form onSubmit={onSubmit}>
          <TitleWrap>
            <span>
              <Titleinput
                type="text"
                placeholder="제목을 입력하세요"
                onChange={onChange}
              />
            </span>
            <span>
              <Categoryselect
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="자유 게시판">자유 게시판</option>
                <option value="질문 게시판">질문 게시판</option>
                <option value="프로젝트 자랑 게시판">
                  프로젝트 자랑 게시판
                </option>
                <option value="공지 게시판">공지 게시판</option>
              </Categoryselect>
            </span>
          </TitleWrap>
          {selectedCategory === "프로젝트 자랑 게시판" && (
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
              const data = editor.getData();
              setValue({ ...form, content: data });
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          <Hashtag
            type="text"
            placeholder="#태그입력"
            onChange={handlehashtag}
          />
          <SubmitBtnWrap>
            <SubmitBtn $borderColor="#929292" $bgColor="transparent">
              임시저장
            </SubmitBtn>
            <SubmitBtn $borderColor="#86FDE8" $bgColor="#86FDE8" type="submit">
              확인
            </SubmitBtn>
          </SubmitBtnWrap>
        </form>
      </Wrap>
    </>
  );
}

export default BoardWrite;
