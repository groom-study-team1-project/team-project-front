import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { editorConfig } from "../editor/editorConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faXmark } from "@fortawesome/free-solid-svg-icons";
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

const WriteBoard = ({ postData, postId }) => {
  const navigate = useNavigate();
  const [form, setValue] = useState({ title: "", content: "", hashtags: [] });
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [imgUrls, setImgUrls] = useState([]); // 이미지 URL을 저장하는 상태
  const fileInput = useRef(null);
  const [draggedItem, setDraggedItem] = useState(null); // 드래그된 항목 상태

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

  // 카테고리 변경 처리 함수
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // 이미지 추가 버튼 클릭 시 파일 입력창 열기
  const handleClickImgadd = () => {
    fileInput.current.click();
  };

  // 파일 선택 시 이미지 URL을 배열에 추가
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImgUrls = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImgUrls.push(reader.result);
        if (newImgUrls.length === files.length) {
          setImgUrls((prevImgUrls) => [...prevImgUrls, ...newImgUrls]); // 새 이미지를 기존 배열에 추가
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 해시태그 입력 처리 함수
  const handlehashtag = (e) => {
    const hashtagStr = e.target.value;
    const hashtagArray = hashtagStr
      .split(" ")
      .filter((item) => item.startsWith("#"));
    setValue({ ...form, hashtags: hashtagArray });
  };

  // 제목 입력 변경 처리 함수
  const onChange = (e) => {
    setValue({ ...form, title: e.target.value });
  };

  // 이미지 삭제 처리 함수
  const deletePreviewImg = (indexToDelete) => {
    setImgUrls((prevImgUrls) =>
      prevImgUrls.filter((_, index) => index !== indexToDelete)
    );
  };

  // 드래그 시작 처리 함수
  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  // 드래그 오버 처리 함수 (기본 이벤트 취소)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 드랍 처리 함수 (이미지 배열 변경)
  const handleDrop = (index) => {
    const draggedOverItem = index;

    if (draggedItem === draggedOverItem) return;

    const items = [...imgUrls];
    const item = items[draggedItem];

    // 드래그한 이미지를 드랍 위치에 삽입
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
        await fetchPostChange(body, postId); // 게시물 수정
      } else {
        await createPost(body); // 새 게시물 작성
      }
    } catch (error) {
      console.error(error);
    }
  };

  const API_URL = "http://localhost:7000/api/post/image";
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("upload", file);
            fetch(`${API_URL}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: res.url[0],
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
          <CKEditor
            editor={ClassicEditor}
            config={{
              ...editorConfig,
              placeholder: "내용을 입력하세요.",
              extraPlugins: [uploadPlugin], // 커스텀 업로드 어댑터 플러그인
            }}
            data={form.content}
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
            <SubmitBtn $borderColor="#86FDE8" $bgColor="#86FDE8" type="submit">
              확인
            </SubmitBtn>
          </SubmitBtnWrap>
        </form>
      </Wrap>
    </>
  );
};

export default WriteBoard;
