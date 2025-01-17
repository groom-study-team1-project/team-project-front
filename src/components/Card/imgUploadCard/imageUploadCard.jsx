import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPhotoFilm, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
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
import { imageUpload } from "../../../services/api/imageApi";

const ImageUploadCard = ({ imgUrls, setImgUrls, form, setForm }) => {
  const { isMobile } = useSelector((state) => state.screenSize);
  const fileInput = useRef(null);

  const handleClickImgadd = () => {
    fileInput.current.click();
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    try {
      const uploadedFiles = await Promise.all(
          files.map(async (file) => {
            const result = await imageUpload("POST", file);
            return result;
          })
      );

      const uploadedUrls = uploadedFiles.map((file) => file.accessImage);
      const uploadedKeys = uploadedFiles.map((file) => file.fileKey);

      setImgUrls((prevImgUrls) => [...prevImgUrls, ...uploadedUrls]);
      setForm((prevForm) => {
        const updatedImageUrls = [...prevForm.imageUrls, ...uploadedUrls];
        return {
          ...prevForm,
          imageUrls: updatedImageUrls,
          slideImageKeys: [...(prevForm.slideImageKeys || []), ...uploadedKeys],
          thumbnailImageUrl: prevForm.thumbnailImageUrl || updatedImageUrls[0],
        };
      });
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };


  const deletePreviewImg = (indexToDelete) => {
    setImgUrls((prevImgUrls) =>
        prevImgUrls.filter((_, index) => index !== indexToDelete)
    );

    setForm((prevForm) => ({
      ...prevForm,
      imageUrls: (prevForm.imageUrls || []).filter(
          (_, index) => index !== indexToDelete
      ),
      slideImageKeys: (prevForm.slideImageKeys || []).filter(
          (_, index) => index !== indexToDelete
      ),
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
