import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import {
  ImgWrap,
  ImgPreviewWrap,
  ImgPreview,
  ImgPreviewDelete,
  ImgAdd,
} from "./imageUpload.style";

const ImageUploadCard = ({ imgUrls, setImgUrls }) => {
  const fileInput = useRef(null);
  const [draggedItem, setDraggedItem] = useState(null); // 드래그된 항목 상태
  const handleClickImgadd = () => {
    fileInput.current.click();
  };

  const handleFileChange = async (e) => {
    const API_URL = "http://localhost:7000/api/post/image";

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
  return (
    <>
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
          <FontAwesomeIcon icon={faPhotoFilm} style={{ fontSize: "24px" }} />
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
    </>
  );
};

export default ImageUploadCard;
