import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import {
  createPost,
  fetchPostChange,
  fetchPostDetail,
} from "../../../services/postApi";
import backBtn from "../../../assets/images/back-removebg-preview.png";
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
} from "./BoardWrite.style";

const BoardWrite = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    hashtags: [],
  });
  const [postData, setPostData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [imgUrls, setImgUrls] = useState([]); // State to store multiple image URLs
  const fileInput = useRef(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPostDetail(postId);
        setPostData(response);

        setFormValue({
          title: response.postInfo.title || "",
          content: response.postInfo.content || "",
          hashtags: response.postInfo.hashtags || [],
        });

        setSelectedCategory(response.categoryInfo.id);

        const imgurl = response.postInfo.imgUrl.map((img) => img.url);
        setImgUrls(imgurl);
      } catch (error) {
        console.error("데이터를 가져오는데 실패", error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, []);

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

  const handleHashTag = (e) => {
    const hashtagStr = e.target.hashtag.value;
    const hashtagArray = hashtagStr
      .split(" ")
      .filter((item) => item.startsWith("#"));
    setFormValue({ ...formValue, hashtags: hashtagArray });
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, title: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, content, hashtags } = formValue;
      const category_id = Number(selectedCategory);

      let body = { title, content, hashtags, category_id };

      if (category_id === 2) {
        body.imgUrls = imgUrls;
      }

      if (postData) {
        await fetchPostChange(body, postId);
      } else {
        await createPost(body);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrap>
        <WriteWrap>
          <BackImg
            src={backBtn}
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
                value={formValue.title}
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
            data={formValue.content}
            onReady={(editor) => {
              // console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              const data = editor.getData();
              setFormValue({ ...formValue, content: data });
            }}
            onFocus={(event, editor) => {
              // console.log("Focus.", editor);
            }}
          />
          <Hashtag
            type="text"
            placeholder="#태그입력"
            name="hashtag"
            onChange={handleHashTag}
            value={formValue.hashtags.join(" ")}
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

export default BoardWrite;
