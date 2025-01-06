import React, { useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPhotoFilm, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axiosInstance from "../../../services/axiosConfig";
import {
  ImgWrap,
  ImgPreviewWrap,
  ImgPreview,
  ImgPreviewDelete,
  ImgAddWrap,
  ImgAdd,
  CustomArrow,
  CustomSlider,
} from "./imageUpload.style";

const ImageUploadCard = ({ imgUrls, setImgUrls, form, setForm }) => {
  const { isMobile } = useSelector((state) => state.screenSize);
  const fileInput = useRef(null);

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
      return response.data.result.imageUrl;
    }

    throw new Error(response.data?.status?.message || "이미지 업로드 실패");
  };

  const handleFileChange = async (e) => {
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

  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
      <span {...props}>{children}</span>
  );

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: isMobile ? 2 : 3,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: (
        <SlickButtonFix>
          <CustomArrow>
            <FontAwesomeIcon icon={faAngleRight} />
          </CustomArrow>
        </SlickButtonFix>
    ),
    prevArrow: (
        <SlickButtonFix>
          <CustomArrow>
            <FontAwesomeIcon icon={faAngleLeft} />
          </CustomArrow>
        </SlickButtonFix>
    ),
  };

  return (
      <ImgWrap>
        <CustomSlider {...settings}>
          {imgUrls.map((url, index) => (
              <ImgPreviewWrap key={index}>
                <ImgPreview src={url} alt={`Preview ${index}`} $isMobile={isMobile} />
                <ImgPreviewDelete onClick={() => deletePreviewImg(index)}>
                  <FontAwesomeIcon icon={faXmark} />
                </ImgPreviewDelete>
              </ImgPreviewWrap>
          ))}
          <ImgAddWrap>
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
          </ImgAddWrap>
        </CustomSlider>
      </ImgWrap>
  );
};

export default ImageUploadCard;
