import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faXmark } from "@fortawesome/free-solid-svg-icons";
import { editorConfig } from "./editor";
import axios from "axios";
import GlobalStyle from "../../assets/styles/GlobalStyle";
import { createPost, fetchPostChange } from "../../services/postApi";
import backBtn from "../../assets/images/back-removebg-preview.png";
import {
  BackImg,
  Categoryselect,
  Hashtag,
  ImgAdd,
  ImgPreview,
  ImgWrap,
  SubmitBtn,
  SubmitBtnWrap,
  Titleinput,
  TitleWrap,
  Wrap,
  Write,
  WriteWrap,
  ImgPreviewDelete,
  ImgPreviewWrap,
} from "./WriteBoard.style";

import "./App.css";
import "ckeditor5/ckeditor5.css";

const WriteBoard = ({ postData, postId }) => {
  const navigate = useNavigate();
  const [form, setValue] = useState({ title: "", content: "", hashtags: [] });
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [imgUrls, setImgUrls] = useState([]); // 이미지 URL을 저장하는 상태
  const fileInput = useRef(null);
  const [draggedItem, setDraggedItem] = useState(null); // 드래그된 항목 상태

  const toolbarContainerRef = useRef(null); // 툴바 컨테이너 참조
  const editorContainerRef = useRef(null); // 에디터 컨테이너 참조
  const API_URL = "http://localhost:7000/api/post/image";

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

  const handleClickImgadd = () => {
    fileInput.current.click();
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const newImgUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("upload", file);

      try {
        const response = await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        newImgUrls.push(response.data.url);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }

    setImgUrls((prevImgUrls) => [...prevImgUrls, ...newImgUrls]);
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

  const deletePreviewImg = (indexToDelete) => {
    setImgUrls((prevImgUrls) =>
      prevImgUrls.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const draggedOverItem = index;

    if (draggedItem === draggedOverItem) return;

    const items = [...imgUrls];
    const item = items[draggedItem];

    items.splice(draggedItem, 1);
    items.splice(draggedOverItem, 0, item);

    setImgUrls(items);
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

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("upload", file);
            axios
              .post(`${API_URL}`, body)
              .then((res) => {
                resolve({
                  default: res.data.url[0],
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      <GlobalStyle />
      <Wrap>
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
            <ImgWrap>
              {imgUrls.map((url, index) => (
                <ImgPreviewWrap
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                >
                  <ImgPreview src={url} alt={`Preview ${index}`} />
                  <ImgPreviewDelete onClick={() => deletePreviewImg(index)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </ImgPreviewDelete>
                </ImgPreviewWrap>
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
          <div ref={editorContainerRef}>
            <div ref={toolbarContainerRef}></div>
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
