import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import { editorConfig } from "./editor";
import {
  createPost,
  fetchPostChange,
  uploadAdapter,
} from "../../../../services/api/postApi";
import backBtn from "../../../../assets/images/back-removebg-preview.png";
import Navbar from "../../../../Layout/Navbar/Navbar";
import ImageUploadCard from "../../../../components/Card/imgUploadCard/imageUploadCard";
import ProjectuploadAdapter from "../../../../components/Card/imgUploadCard/imageUploadCard";
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
import { useSelector } from "react-redux";
import "./App.css";
import "ckeditor5/ckeditor5.css";

const WriteBoard = ({ postData, postId, imgList }) => {
  const { isMobile } = useSelector((state) => state.screenSize);
  const navigate = useNavigate();
  const [form, setValue] = useState({
    title: "",
    content: "",
    hashtags: [],
    imageUrls: [],
    thumbnail: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [imgUrls, setImgUrls] = useState([]);
  const toolbarContainerRef = useRef(null);
  const editorContainerRef = useRef(null);

  useEffect(() => {
    if (postData) {
      setValue({
        title: postData.title || "",
        content: postData.content || "",
        hashtags: postData.hashtags || [],
        imageUrls: postData.imageUrls || [],
        thumbnail: postData.thumbnail || "",
      });
      setSelectedCategory(postData.categoryId);
      if (postData.imageUrls?.length) {
        setImgUrls(postData.imageUrls);
      }
    }
  }, [postData]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleHashtagChange = (e) => {
    const hashtagStr = e.target.value;
    const hashtagArray = hashtagStr
        .split(" ")
        .filter((item) => item.startsWith("#"));
    setValue({ ...form, hashtags: hashtagArray });
  };

  const handleTitleChange = (e) => {
    setValue({ ...form, title: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // 상태 확인
      console.log("Form State before Submit:", form);

      const { title, content, hashtags, imageUrls, thumbnail } = form;

      const processedHashtags = hashtags
          .filter((item) => item.startsWith("#"))
          .map((item) => item.replace("#", ""));

      const categoryId = Number(selectedCategory);

      if (!title.trim() || !content.trim() || !categoryId) {
        throw new Error("제목, 내용, 카테고리는 필수 입력 항목입니다.");
      }

      const body = {
        title: title.trim(),
        content: content.trim(),
        hashtags: processedHashtags,
        categoryId,
        imageUrls: [...imageUrls],
        thumbnail,
      };

      console.log("Request Body before API call:", body);

      // API 호출
      if (postData) {
        await fetchPostChange(body, postId);
      } else {
        await createPost(body);
      }

      navigate(-1);
    } catch (error) {
      console.error("Error on Submit:", error.message);
      alert(error.message || "게시글 저장 중 오류가 발생했습니다.");
    }
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    let thumbnailUrl = "";

    // Use DOMParser to safely parse and extract the image src
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const imgElement = doc.querySelector("img");

    if (imgElement) {
      thumbnailUrl = imgElement.getAttribute("src");
    }

    setValue({
      ...form,
      content: data,
      thumbnail: thumbnailUrl,
    });
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader, (uploadedUrl) => {
        setValue((prev) => ({
          ...prev,
        }));
      });
    };
  }

  return (
      <>
        {isMobile ? (
            <Navbar $isMobile={isMobile} />
        ) : (
            <Navbar isMainPage={true} />
        )}
        <Wrap>
          <WriteWrap>
            <BackImg
                $isMobile={isMobile}
                src={backBtn}
                alt="뒤로 가기"
                onClick={() => navigate(-1)}
            />
            <Write $isMobile={isMobile}>글 쓰기</Write>
          </WriteWrap>
          <form onSubmit={onSubmit}>
            <TitleWrap $isMobile={isMobile}>
            <span>
              <Titleinput
                  type="text"
                  placeholder="제목을 입력하세요"
                  onChange={handleTitleChange}
                  value={form.title}
                  $isMobile={isMobile}
              />
            </span>
              <span>
              <Categoryselect
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                  $isMobile={isMobile}
              >
                <option value={1}>자유 게시판</option>
                <option value={2}>프로젝트 자랑 게시판</option>
                <option value={3}>질문 게시판</option>
                <option value={4}>공지 게시판</option>
              </Categoryselect>
            </span>
            </TitleWrap>
            {Number(selectedCategory) === 2 && (
                <ImageUploadCard
                    imgUrls={imgUrls}
                    setImgUrls={setImgUrls}
                    form={form}
                    setForm={setValue}
                />
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
                onBlur={getDataFromCKEditor}
            />
            <Hashtag
                type="text"
                placeholder="#태그입력"
                name="hashtag"
                onChange={handleHashtagChange}
                value={form.hashtags.join(" ")}
                $isMobile={isMobile}
            />
            <SubmitBtnWrap $isMobile={isMobile}>
              <SubmitBtn
                  $borderColor="#929292"
                  $bgColor="transparent"
                  $isMobile={isMobile}
              >
                임시저장
              </SubmitBtn>
              <SubmitBtn
                  $borderColor="#B1CDE9"
                  $bgColor="#B1CDE9"
                  type="submit"
                  $isMobile={isMobile}
              >
                확인
              </SubmitBtn>
            </SubmitBtnWrap>
          </form>
        </Wrap>
      </>
  );
};

export default WriteBoard;
