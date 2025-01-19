import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import { editorConfig } from "./editor";
import {
  createPost, createProjectPost,
  fetchPostChange,
  uploadAdapter,
} from "../../../../services/api/postApi";
import Navbar from "../../../../Layout/Navbar/Navbar";
import ImageUploadCard from "../../../../components/Card/imgUploadCard/imageUploadCard";
import {
  Categoryselect,
  HashtagWrap,
  Hashtag,
  SubmitBtnWrap,
  Titleinput,
  TitleWrap,
  Wrap,
  SmallWrite,
  Write,
  WriteWrap,
  Toolbar,
  EditorWrap,
  Hashtags,
  CancelBtn,
  ConfirmBtn
} from "./BoardWrite.style";
import { useSelector } from "react-redux";
import "./App.css";
import "ckeditor5/ckeditor5.css";

const WriteBoard = ({ postData, postId, imgList }) => {
  const { isMobile } = useSelector((state) => state.screenSize);
  const selectedCategoryId = useSelector((state) => state.category.selectedCategoryId);
  const [form, setValue] = useState({
    title: "",
    content: "",
    thumbnailImageUrl : "",
    categoryId: null,
    hashtags: [],
    imageKeys: [],
  });
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryId || 1);
  const [slideImgKeys, setSlideImgKeys] = useState([]);
  const navigate = useNavigate();
  const toolbarContainerRef = useRef(null);
  const editorContainerRef = useRef(null);

  const categoryMap = {
    1: "자유 게시판",
    2: "프로젝트 자랑 게시판",
    3: "질문 게시판",
    4: "공지 게시판"
  }

  useEffect(() => {
    if (postData) {
      setValue({
        title: postData.title || "",
        content: postData.content || "",
        thumbnailImageUrl : postData.thumbnailImageUrl || "",
        categoryId: postData.categoryId || null,
        hashtags: postData.hashtags || [],
        imageKeys: postData.imageKeys || [],
      });

      setSelectedCategory(postData.categoryId);

      if (postData.content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(postData.content, "text/html");
        const imgElements = doc.querySelectorAll("img");
        const imgLinks = Array.from(imgElements)
            .map((img) => img.src)
            .filter((src) => src);

        const imageKey = imgLinks.map((url) =>
            url.replace(
                "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/",
                ""
            )
        );
        const thumbnailImageKey = imageKey[0] || "";

        setValue((prev) => ({
          ...prev,
          imageKeys: imageKey,
          thumbnailImageUrl: thumbnailImageKey,
        }));
      }
    }
  }, [postData]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleHashtagChange = (e) => {

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      const hashtagStr = e.target.value.trim();
      if (!hashtagStr) return;

      const tag = hashtagStr.startsWith('#') ? hashtagStr : `#${hashtagStr}`;

      setValue(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, tag]
      }));

      e.target.value = "";
    }
  };

  const removeHashtag = (indexToRemove) => {
    setValue(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleTitleChange = (e) => {
    setValue({ ...form, title: e.target.value });
  };

  const syncImagesWithContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const imgElements = doc.querySelectorAll("img");
    const imgLinks = Array.from(imgElements).map((img) => img.src).filter((src) => src);

    const imageKeys = imgLinks.map((url) =>
        url.replace(
            "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/",
            ""
        )
    );

    const thumbnailImageKey = imgLinks[0] || "";

    setValue((prev) => ({
      ...prev,
      content: content,
      imageKeys: imageKeys,
      thumbnailImageKey: thumbnailImageKey,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {

      const categoryId = Number(selectedCategory);

      const { hashtags, imageKeys, title, content, thumbnailImageKey } = form;

      if (!title.trim() || !content.trim() || !categoryId) {
        throw new Error("제목, 내용, 카테고리는 필수 입력 항목입니다.");
      }

      const processedHashtags = hashtags
          .filter((item) => item.startsWith("#"))
          .map((item) => item.replace("#", ""));

      const finalImageKeys =
          imageKeys && imageKeys.length > 0 ? imageKeys : [];

      if (categoryId === 2) {
        if (!slideImgKeys.length) {
          console.error("프로젝트 게시판은 슬라이드 이미지 등록이 필수 입니다");
        }

        const projectBody = {
          title: title.trim(),
          content: content.trim(),
          hashtags: processedHashtags,
          categoryId,
          thumbnailImageKey: thumbnailImageKey || "posts/thumbnail.png",
          imageKeys: finalImageKeys,
          slideImageKeys: slideImgKeys.map(img => img.fileKey),
        };

        await createProjectPost(projectBody);

      } else {

        const body = {
          title: title.trim(),
          content: content.trim(),
          hashtags: processedHashtags,
          categoryId,
          thumbnailImageKey: thumbnailImageKey || "posts/thumbnail.png",
          imageKeys: finalImageKeys,
        };

        await createPost(body)
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
        {isMobile ? <Navbar $isMobile={isMobile} /> : <Navbar isMainPage={true} />}
        <Wrap>
          <WriteWrap>
            <SmallWrite>{categoryMap[selectedCategory]}</SmallWrite>
            <Write $isMobile={isMobile}>글 작성</Write>
          </WriteWrap>
          <form onSubmit={onSubmit}>
            <TitleWrap $isMobile={isMobile}>
              <Titleinput
                  type="text"
                  placeholder="제목을 입력하세요"
                  onChange={handleTitleChange}
                  value={form.title}
                  $isMobile={isMobile}
              />
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
            </TitleWrap>
            {Number(selectedCategory) === 2 && (
                <ImageUploadCard
                    slideImg={slideImgKeys}
                    setSlideImg={setSlideImgKeys}
                />
            )}
            <EditorWrap ref={editorContainerRef}>
              <Toolbar
                  ref={toolbarContainerRef}
              ></Toolbar>
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
            </EditorWrap>
            <HashtagWrap>
              <Hashtag
                  type="text"
                  placeholder="#태그입력"
                  name="hashtag"
                  onKeyDown={(e) => handleHashtagChange(e)}
                  $isMobile={isMobile}
              />
              {form.hashtags.map((tag, index) => (
                <Hashtags
                  key={index}
                  $isMobile={isMobile}
                  onClick={() => removeHashtag(index)}
                >
                  {tag}
                </Hashtags>
              ))}
            </HashtagWrap>
            <SubmitBtnWrap $isMobile={isMobile}>
              <ConfirmBtn
                  $borderColor="#B1CDE9"
                  $bgColor="#B1CDE9"
                  type="submit"
                  $isMobile={isMobile}
              >
                작성
              </ConfirmBtn>
              <CancelBtn
                  $borderColor="#929292"
                  $bgColor="transparent"
                  $isMobile={isMobile}
              >
                취소
              </CancelBtn>
            </SubmitBtnWrap>
          </form>
        </Wrap>
      </>
  );
};

export default WriteBoard;
