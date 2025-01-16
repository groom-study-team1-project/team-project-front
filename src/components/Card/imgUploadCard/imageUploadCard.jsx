import React, {useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPhotoFilm, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
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
  const slideRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleClickImgAdd = (index) => {
    fileInputs.current[index].current.click();
  };

  const updateArrow = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    console.log('scrollLeft:', scrollLeft);
    console.log('scrollWidth:', scrollWidth);
    console.log('clientWidth:', clientWidth);

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const handleScroll = (direction) => {
    if (!slideRef.current) return;

    const scrollAmount = isMobile ? 144 + 16 : 288 + 16; // 이미지 너비 + 간격

    slideRef.current.scrollTo({
      left: slideRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
  };

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
        <SlideArrowWrap onClick={() => handleScroll('left')} $disabled={showLeftArrow}>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </SlideArrowWrap>
        <ImgWrap ref={slideRef} onScroll={updateArrow}>
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
        <SlideArrowWrap onClick={() => handleScroll('right')} $disabled={showRightArrow}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </SlideArrowWrap>
      </SlideWrap>
  );
};

export default ImageUploadCard;
