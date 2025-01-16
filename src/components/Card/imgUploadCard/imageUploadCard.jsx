import React, {useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPhotoFilm, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axiosInstance from "../../../services/axiosConfig";
import {
  SlideWrap,
  ImgWrap,
  SlideArrowWrap,
  ImgPreviewWrap,
  ImgPreview,
  ImgPreviewDelete,
  ImgAdd
} from "./imageUpload.style";

const ImageUploadCard = ({ imgUrls, setImgUrls, form, setForm }) => {
  const { isMobile } = useSelector((state) => state.screenSize);
  const [images, setImages] = useState(Array(4).fill(null));
  const fileInputs = useRef(Array(4).fill(null).map(() => React.createRef()));
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const handleClickImgAdd = (index) => {
    fileInputs.current[index].current.click();
  };

  const handleScroll = (direction) => {
    if (direction === 'left') {
      slideRef.current.slickPrev();
      setCurrentSlide(prev => Math.max(0, prev - 1));
    } else {
      slideRef.current.slickNext();
      setCurrentSlide(prev => prev + 1);
    }
  };

  const ProjectuploadAdapter = async (file) => {
    const formData = new FormData();
    formData.append("imageFile", file);

    const response = await axiosInstance.post("/api/posts/project/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data?.status?.code === 1204) {
      return response.data.result.imageUrl;
    }

    throw new Error(response.data?.status?.message || "이미지 업로드 실패");
  };

  /*const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    try {
      const uploadedUrls = await Promise.all(
          files.map(async (file) => await ProjectuploadAdapter(file))
      );

      setImgUrls((prevImgUrls) => [...prevImgUrls, ...uploadedUrls]);
      setForm((prevForm) => ({
        ...prevForm,
        imageUrls: [...prevForm.imageUrls, ...uploadedUrls],
      }));
    } catch (error) {
      console.error("이미지 업로드 실패:", error.message);
    }
  };*/

  const handleFileChange = (index) => (e)=> {
    const file = e.target.files[0];
    if (file) {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
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
  };

  return (
      <SlideWrap>
        <SlideArrowWrap>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </SlideArrowWrap>
        <ImgWrap>
          {[0, 1, 2, 3].map((index) => (
              <ImgAdd index={index} onClick={() => handleClickImgAdd(index)} $isMobile={isMobile}>
                {images[index] ? (
                    <ImgPreviewWrap key={index}>
                      <ImgPreview src={URL.createObjectURL(images[index])} alt={`Preview ${index}`} $isMobile={isMobile} />
                      <ImgPreviewDelete onClick={() => deletePreviewImg(index)}>
                        <FontAwesomeIcon icon={faXmark} />
                      </ImgPreviewDelete>
                    </ImgPreviewWrap>
                ) : (
                    <FontAwesomeIcon icon={faPhotoFilm} style={{ fontSize: "24px" }} />
                )}
                <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    ref={fileInputs.current[index]}
                    onChange={handleFileChange(index)}
                />
              </ImgAdd>
          ))}
        </ImgWrap>
        <SlideArrowWrap>
          <FontAwesomeIcon icon={faAngleRight}/>
        </SlideArrowWrap>
      </SlideWrap>
  );
};

export default ImageUploadCard;
