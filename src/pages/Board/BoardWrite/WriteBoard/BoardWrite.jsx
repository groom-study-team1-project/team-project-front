import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";

import { editorConfig } from "./editor";

import GlobalStyle from "../../../../assets/styles/GlobalStyle";
import {
  createPost,
  fetchPostChange,
  uploadAdapter,
} from "../../../../services/api/postApi";
import backBtn from "../../../../assets/images/back-removebg-preview.png";
import Navbar from "../../../../Layout/Navbar/Navbar";
import ImageUploadCard from "../../../../components/Card/imgUploadCard/imageUploadCard";
import {
  BackImg,
  Categoryselect,
  Hashtag,
  SubmitBtn,
  SubmitBtnWrap,
  Titleinput,
  TitleWrap,
  Wrap,
  Write,
  WriteWrap,
  Toolbar,
} from "./BoardWrite.style";

import "./App.css";
import "ckeditor5/ckeditor5.css";

const WriteBoard = ({ postData, postId }) => {
  const navigate = useNavigate();
  const [form, setValue] = useState({ title: "", content: "", hashtags: [] });
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [imgUrls, setImgUrls] = useState([]);

  const toolbarContainerRef = useRef(null);
  const editorContainerRef = useRef(null);

  useEffect(() => {
    if (postData) {
      setValue({
        title: postData.postInfo.title || "",
        content: postData.postInfo.content || "",
        hashtags: postData.postInfo.hashtags || [],
      });
      setSelectedCategory(postData.categoryInfo.id);
      const imgurl = postData.postInfo.imgUrl.map((img) => img.url);
      setImgUrls(imgurl);
    }
  }, [postData]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlehashtag = (e) => {
    const hashtagStr = e.target.value;
    const hashtagArray = hashtagStr
      .split(" ")
      .filter((item) => item.startsWith("#"));
    setValue({ ...form, hashtags: hashtagArray });
  };

  const onChange = (e) => {
    setValue({ ...form, title: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, content, hashtags } = form;
      let body = {};
      const category_id = Number(selectedCategory);

      if (category_id === 2) {
        body = { title, content, hashtags, category_id, imgUrls };
      } else {
        body = { title, content, hashtags, category_id };
      }

      if (postData) {
        await fetchPostChange(body, postId);
      } else {
        await createPost(body);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      <GlobalStyle />
      <Navbar isMainPage={true} />
      <Wrap>
        <Navbar isMainPage={true} />
        <WriteWrap>
          <BackImg src={backBtn} alt="뒤로 가기" onClick={() => navigate(-1)} />
          <Write>글 쓰기</Write>
        </WriteWrap>
        <form onSubmit={onSubmit}>
          <TitleWrap>
            <span>
              <Titleinput
                type="text"
                placeholder="제목을 입력하세요"
                onChange={onChange}
                value={form.title}
              />
            </span>
            <span>
              <Categoryselect
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value={0}>자유 게시판</option>
                <option value={1}>질문 게시판</option>
                <option value={2}>프로젝트 자랑 게시판</option>
                <option value={3}>공지 게시판</option>
              </Categoryselect>
            </span>
          </TitleWrap>
          {Number(selectedCategory) === 2 && (
            <ImageUploadCard imgUrls={imgUrls} setImgUrls={setImgUrls} />
          )}
          <div ref={editorContainerRef}>
            <Toolbar
              style={{ marginBottom: "30px" }}
              ref={toolbarContainerRef}
            ></Toolbar>
          </div>
          <CKEditor
            editor={DecoupledEditor}
            config={{
              ...editorConfig,
              extraPlugins: [uploadPlugin],
            }}
            data={form.content}
            onReady={(editor) => {
              const toolbarElement = editor.ui.view.toolbar.element;
              if (toolbarContainerRef.current.firstChild !== toolbarElement) {
                toolbarContainerRef.current.innerHTML = "";
                toolbarContainerRef.current.appendChild(toolbarElement);
              }

              const editableElement = editor.ui.view.editable.element;
              if (!editorContainerRef.current.contains(editableElement)) {
                editorContainerRef.current.appendChild(editableElement);
              }
            }}
            onBlur={(event, editor) => {
              const data = editor.getData();
              setValue({ ...form, content: data });
            }}
          />

          <Hashtag
            type="text"
            placeholder="#태그입력"
            name="hashtag"
            onChange={handlehashtag}
            value={form.hashtags.join(" ")}
          />
          <SubmitBtnWrap>
            <SubmitBtn $borderColor="#929292" $bgColor="transparent">
              임시저장
            </SubmitBtn>
            <SubmitBtn $borderColor="#B1CDE9" $bgColor="#B1CDE9" type="submit">
              확인
            </SubmitBtn>
          </SubmitBtnWrap>
        </form>
      </Wrap>
    </>
  );
};

export default WriteBoard;
