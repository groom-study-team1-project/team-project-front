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
    fileUrl: "",
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
      });
      setSelectedCategory(postData.categoryId);
      if (postData.id === 2) {
        const imgurl = imgList.imgUrl.map((img) => img.url);
        setImgUrls(imgurl);
      }
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
      const { title, content, hashtags, fileUrl } = form;
      let body = {};
      const category_id = Number(selectedCategory);

      if (category_id === 2) {
        body = { title, content, hashtags, category_id, imgUrls, fileUrl };
      } else {
        body = { title, content, hashtags, category_id, fileUrl };
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

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    console.log(data);

    if (data && data.match("<img src=")) {
      const whereImg_start = data.indexOf("<img src=");
      console.log(whereImg_start);
      let whereImg_end = "";
      let ext_name_find = "";
      let result_Img_Url = "";

      const ext_name = ["jpeg", "png", "jpg", "gif"];

      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          console.log(data.indexOf(`${ext_name[i]}`));
          ext_name_find = ext_name[i];
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }
      }
      console.log(ext_name_find);
      console.log(whereImg_end);

      if (ext_name_find === "jpeg") {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
      }

      console.log(result_Img_Url, "result_Img_Url");
      setValue({
        ...form,
        fileUrl: result_Img_Url,
        content: data,
      });
    } else {
      setValue({
        ...form,
        fileUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6KVvlziiJYFxZZIq3Xc_dVuzIbSLrgvtHPA&s",
        content: data,
      });
    }
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
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
                onChange={onChange}
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
            onBlur={getDataFromCKEditor}
          />

          <Hashtag
            type="text"
            placeholder="#태그입력"
            name="hashtag"
            onChange={handlehashtag}
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
