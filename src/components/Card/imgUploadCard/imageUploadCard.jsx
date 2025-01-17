import React, {useEffect, useRef, useState} from "react";
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
import {uploadAdapter} from "../../../services/api/postApi";

const ImageUploadCard = ({ slideImg, setSlideImg }) => {
  const { isMobile } = useSelector((state) => state.screenSize);
  const [images, setImages] = useState(Array(4).fill(null));
  const fileInputs = useRef(Array(4).fill(null).map(() => React.createRef()));
  const slideRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    if (slideImg.length > 0) {
      const initialImage = Array(4).fill(null);
      slideImg.forEach((item, index) => {
        if (item?.accessImage) {
          initialImage[index] = item.accessImage;
        }
      });
      setImages(initialImage);
    }
  }, []);

  const handleClickImgAdd = (index) => {
    fileInputs.current[index].current.click();
  };

  const updateArrow = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;

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

  const handleImgUpload = (index) => (accessImage, fileKey) => {
    const newImage = [...images];
    newImage[index] = accessImage;
    setImages(newImage);

    const newSlideImage = [...slideImg];
    newSlideImage[index] = {
      accessImage: accessImage,
      fileKey: fileKey,
    };
    setSlideImg(newSlideImage);
  }

  const handleFileChange = (index) => async (e)=> {
    const file = e.target.files[0];
    if (file) {
      try {
        const tempImage = URL.createObjectURL(file);
        const newImages = [...images];
        newImages[index] = tempImage;
        setImages(newImages);

        const loader = {
          file: Promise.resolve(file)
        };
        const adaptor = uploadAdapter(loader, handleImgUpload(index));
        await adaptor.upload();

      } catch (error) {
        console.error('Error uploading image: ', error);

        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
      }
    }
  };

  const deletePreviewImg = (indexToDelete) => {

    const newImages = [...images];
    newImages[indexToDelete] = null;
    setImages(newImages);

    setSlideImg(prevSlideImg =>
      prevSlideImg.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
      <SlideWrap>
        <SlideArrowWrap onClick={() => handleScroll('left')} $disabled={showLeftArrow}>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </SlideArrowWrap>
        <ImgWrap ref={slideRef} onScroll={updateArrow}>
          {[0, 1, 2, 3].map((index) => (
              <ImgAdd key={index} index={index} onClick={() => handleClickImgAdd(index)} $isMobile={isMobile}>
                {images[index] ? (
                    <ImgPreviewWrap>
                      <ImgPreview src={images[index]} alt={`Preview ${index}`} $isMobile={isMobile} />
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
