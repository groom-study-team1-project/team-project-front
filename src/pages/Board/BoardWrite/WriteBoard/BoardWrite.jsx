import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import { editorConfig } from "./editor";
import {
  createPost,
  createProjectPost,
  editProjectPost,
  fetchPostChange,
  uploadAdapter,
} from "../../../../services/api/postApi";
import Navbar from "../../../../Layout/Navbar/Navbar";
import ImageUploadCard from "../../../../components/Card/imgUploadCard/imageUploadCard";
import {
  Categoryselect,
  Hashtag,
  SubmitBtnWrap,
  Titleinput,
  TitleWrap,
  Wrap,
  Write,
  WriteWrap,
  Toolbar,
  CancelBtn,
  ConfirmBtn,
  EditorWrapper,
  Category,
} from "./BoardWrite.style";
import { useSelector } from "react-redux";
import "./App.css";
import "ckeditor5/ckeditor5.css";

const WriteBoard = ({ postData, postId, imgList }) => {
  const { isMobile } = useSelector((state) => state.screenSize);
  const selectedCategoryId = useSelector(
    (state) => state.category.selectedCategoryId
  );

  const navigate = useNavigate();
  const [form, setValue] = useState({
    title: "",
    content: "",
    hashtags: [],
    imageUrls: [],
    imageKeys: [],
    thumbnailImageUrl: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryId || 1
  );
  const [imgUrls, setImgUrls] = useState([]);
  const toolbarContainerRef = useRef(null);
  const editorContainerRef = useRef(null);

  const categoryNames = {
    1: "자유 게시판",
    2: "프로젝트 자랑 게시판",
    3: "질문 게시판",
    4: "공지 게시판",
  };

  useEffect(() => {
    if (postData) {
      setValue({
        title: postData.title || "",
        content: postData.content || "",
        hashtags: postData.hashtags || [],
        imageUrls: postData.imageUrls || [],
        imageKeys: postData.imageKeys || [],
        thumbnailImageUrl: postData.thumbnailImageUrl || "",
        slideImageUrls: postData.slideImageUrls || [],
      });
      setSelectedCategory(postData.categoryId);
      if (postData.imageUrls?.length) {
        setImgUrls(postData.imageUrls);
      }
      if (postData.categoryId === 2 && postData.slideImageUrls?.length) {
        setImgUrls(postData.slideImageUrls);
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
    setValue({
      ...form,
      hashtags: hashtagArray.map((tag) => tag.replace("#", "")),
    });
  };

  const handleTitleChange = (e) => {
    setValue({ ...form, title: e.target.value });
  };

  const syncImagesWithContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const imgElements = doc.querySelectorAll("img");
    const imgLinks = Array.from(imgElements)
      .map((img) => img.src)
      .filter((src) => src);

    const imageKeys = imgLinks.map((url) =>
      url.replace(
        "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/",
        ""
      )
    );

    setValue((prev) => ({
      ...prev,
      content,
      imageUrls: imgLinks,
      imageKeys,
      thumbnailImageUrl:
        selectedCategory === 2 && (imgUrls.length > 0 || imgLinks.length > 0)
          ? imgUrls[0] || imgLinks[0]
          : imgLinks[0] || "",
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, content, hashtags, imageKeys } = form;
      const categoryId = Number(selectedCategory);

      if (!title.trim() || !content.trim() || !categoryId) {
        throw new Error("제목, 내용, 카테고리는 필수 입력 항목입니다.");
      }

      const body = {
        title: title.trim(),
        content: content.trim(),
        hashtags,
        categoryId,
        thumbnailImageUrl:
          form.thumbnailImageUrl ||
          imgUrls[0] ||
          "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/default-image/posts/thumbnail.png",
        imageKeys: imageKeys || [],
      };

      if (categoryId === 2) {
        body.slideImageKeys = imgUrls.map((url) =>
          url.replace(
            "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/",
            ""
          )
        );
        if (postData) {
          await editProjectPost(postId, body);
        } else {
          await createProjectPost(body);
        }
      } else if (postData) {
        await fetchPostChange(body, postId);
      } else {
        await createPost(body);
      }

      const categoryPaths = {
        1: "/board/free",
        2: "/board/projects",
        3: "/board/questions",
        4: "/board/notices",
      };

      navigate(categoryPaths[categoryId] || "/");
    } catch (error) {
      console.error("Error on Submit:", error.message);
      alert(error.message || "게시글 저장 중 오류가 발생했습니다.");
    }
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    syncImagesWithContent(data);
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader, (uploadedUrl, fileKey) => {
        const currentContent = editor.getData();
        const newImageHtml = `<img src="${uploadedUrl}" alt="uploaded image" />`;
        const updatedContent = `${currentContent}<p>${newImageHtml}</p>`;
        editor.setData(updatedContent);

        setValue((prev) => ({
          ...prev,
          content: updatedContent,
          imageUrls: [...(prev.imageUrls || []), uploadedUrl],
          imageKeys: [...(prev.imageKeys || []), fileKey],
          thumbnailImageUrl: prev.thumbnailImageUrl || uploadedUrl,
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
          <Category>{categoryNames[selectedCategory]}</Category>
          <Write $isMobile={isMobile}>글 작성</Write>
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
            <EditorWrapper>
              <Toolbar ref={toolbarContainerRef}></Toolbar>
              <CKEditor
                editor={DecoupledEditor}
                config={{
                  ...editorConfig,
                  extraPlugins: [uploadPlugin],
                }}
                data={form.content}
                onReady={(editor) => {
                  const toolbarElement = editor.ui.view.toolbar.element;
                  if (
                    toolbarContainerRef.current.firstChild !== toolbarElement
                  ) {
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
            </EditorWrapper>
          </div>
          <Hashtag
            type="text"
            placeholder="#태그입력"
            name="hashtag"
            onFocus={(e) => {
              if (!e.target.value.startsWith("#")) {
                e.target.value = "#";
              }
            }}
            onChange={handleHashtagChange}
            value={form.hashtags.map((tag) => `#${tag}`).join(" ")}
            $isMobile={isMobile}
          />
          <SubmitBtnWrap $isMobile={isMobile}>
            <CancelBtn
              $isMobile={isMobile}
              type="button"
              onClick={() => navigate(-1)}
            >
              취 소
            </CancelBtn>
            <ConfirmBtn $isMobile={isMobile} type="submit">
              확 인
            </ConfirmBtn>
          </SubmitBtnWrap>
        </form>
      </Wrap>
    </>
  );
};

export default WriteBoard;
