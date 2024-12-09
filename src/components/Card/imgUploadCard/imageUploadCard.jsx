import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axiosInstance from "../../../services/axiosConfig";

import {
  ImgWrap,
  ImgPreviewWrap,
  ImgPreview,
  ImgPreviewDelete,
  ImgAdd,
} from "./imageUpload.style";

const ImageUploadCard = ({ imgUrls, setImgUrls, form, setForm }) => {
  const { isMobile } = useSelector((state) => state.screenSize);
  const fileInput = useRef(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleClickImgadd = () => {
    fileInput.current.click();
  };

  const ProjectuploadAdapter = async (file) => {
    const formData = new FormData();
    formData.append("imageFile", file);

    const response = await axiosInstance.post("/api/posts/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data?.status?.code === 1204) {
      const imageUrl = response.data.result.imageUrl;

      console.log("Uploaded Image URL:", imageUrl);

      return imageUrl; // URL만 반환
    }

    throw new Error(response.data?.status?.message || "이미지 업로드 실패");
  };


  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    try {
      console.log("Files to upload:", files);

      const uploadPromises = files.map(async (file) => {
        const imageUrl = await ProjectuploadAdapter(file); // URL 반환
        return imageUrl; // 반환된 URL 저장
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // 상태 한 번만 업데이트
      setImgUrls((prevImgUrls) => {
        const updatedImgUrls = [...prevImgUrls, ...uploadedUrls];
        console.log("Updated imgUrls after upload:", updatedImgUrls);
        return updatedImgUrls;
      });

      setForm((prevForm) => {
        const updatedForm = {
          ...prevForm,
          imageUrls: [...prevForm.imageUrls, ...uploadedUrls],
        };
        console.log("Updated form.imageUrls after upload:", updatedForm.imageUrls);
        return updatedForm;
      });

      console.log("All files uploaded successfully.");
    } catch (error) {
      console.error("이미지 업로드 실패:", error.message);
    }
  };



  const deletePreviewImg = (indexToDelete) => {
    setImgUrls((prevImgUrls) =>
        prevImgUrls.filter((_, index) => index !== indexToDelete)
    );

    setForm((prevForm) => ({
      ...prevForm,
      imageUrls: prevForm.imageUrls.filter((_, index) => index !== indexToDelete),
    }));

    console.log("Deleted image at index:", indexToDelete); // 로그 추가
    console.log("Updated imgUrls after deletion:", imgUrls); // 로그 추가
  };

  return (
      <>
        <ImgWrap isMobile={isMobile}>
          {imgUrls.map((url, index) => (
              <ImgPreviewWrap
                  key={index}
                  draggable
                  onDragStart={() => setDraggedItem(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    const draggedOverItem = index;
                    if (draggedItem === draggedOverItem) return;

                    const items = [...imgUrls];
                    const item = items[draggedItem];

                    items.splice(draggedItem, 1);
                    items.splice(draggedOverItem, 0, item);

                    setImgUrls(items);
                    setForm((prevForm) => ({
                      ...prevForm,
                      imageUrls: items,
                    }));

                    console.log("Reordered imgUrls:", items); // 로그 추가
                  }}
              >
                <ImgPreview src={url} alt={`Preview ${index}`} $isMobile={isMobile} />
                <ImgPreviewDelete onClick={() => deletePreviewImg(index)}>
                  <FontAwesomeIcon icon={faXmark} />
                </ImgPreviewDelete>
              </ImgPreviewWrap>
          ))}

          <ImgAdd onClick={handleClickImgadd} $isMobile={isMobile}>
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

