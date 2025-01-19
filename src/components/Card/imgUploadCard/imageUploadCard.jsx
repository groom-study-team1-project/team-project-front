import React, {useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPhotoFilm, faXmark, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  SlideWrap,
  ImgWrap,
  SlideArrowWrap,
  ImgPreviewWrap,
  ImgPreview,
  ImgPreviewDelete,
  ImgAdd,
  AddSlide,
  AddWrite
} from "./imageUpload.style";
import {uploadAdapter} from "../../../services/api/postApi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageUploadCard = ({ slideImg, setSlideImg }) => {

  const { isMobile } = useSelector((state) => state.screenSize);
  const [images, setImages] = useState(Array(4).fill(null));
  const fileInputs = useRef(Array(4).fill(null).map(() => React.createRef()));
  const slideRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [slideImgIndex, setSlideImgIndex] = useState([0, 1, 2, 3]);

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
        console.log("미리보기 이미지 : ", setImages);
      }
    }
  };

  const deletePreviewImg = (indexToDelete, e) => {

    e.stopPropagation();

    const newImages = [...images];
    newImages[indexToDelete] = null;
    setImages(newImages);

    setSlideImg(prevSlideImg =>
      prevSlideImg.filter((_, index) => index !== indexToDelete)
    );

  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newImages = Array.from(images);
    const newSlideImages = Array.from(slideImg);

    const [removedImage] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, removedImage);

    const [removedSlideImage] = newSlideImages.splice(result.source.index, 1);
    newSlideImages.splice(result.destination.index, 0, removedSlideImage);

    setImages(newImages);
    setSlideImg(newSlideImages);
  }

  const handleAddSlide = () => {
    setImages(prevImage => [...prevImage, null]);
    setSlideImg(prevSlideImg => [...prevSlideImg, null]);
    setSlideImgIndex(prevIndex => [...prevIndex, prevIndex.length]);
    fileInputs.current = [...fileInputs.current, React.createRef()];
  }

  return (
      <SlideWrap>
        <SlideArrowWrap onClick={() => handleScroll('left')} $disabled={showLeftArrow}>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </SlideArrowWrap>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="slide-image-list" direction="horizontal">
            {(provided) => (
                <ImgWrap
                  ref={(el) => {
                    slideRef.current = el;
                    provided.innerRef(el);
                  }}
                  onScroll={updateArrow}
                  {...provided.droppableProps}
                >
                  {slideImgIndex.map((index) => (
                      <Draggable
                          key={`img-${index}`}
                          draggableId={`img-${index}`}
                          index={index}
                          isDragDisabled={!images[index]}
                      >
                        {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.6 : 1
                              }}
                            >
                              <ImgAdd key={index} index={index} onClick={() => handleClickImgAdd(index)} $isMobile={isMobile}>
                                {images[index] ? (
                                    <ImgPreviewWrap>
                                      <ImgPreview src={images[index]} alt={`Preview ${index}`} $isMobile={isMobile} />
                                      <ImgPreviewDelete onClick={(e) => deletePreviewImg(index, e)}>
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
                            </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                  <AddSlide onClick={handleAddSlide} $isMoblie={isMobile}>
                    <FontAwesomeIcon icon={faSquarePlus}
                                     style={{ display: "flex",
                                              alignItems: "center",
                                              width: "50px",
                                              height: "auto",
                                              color: "skyblue"
                                     }}
                    />
                    <AddWrite>추가</AddWrite>
                  </AddSlide>
                </ImgWrap>
            )}
          </Droppable>
        </DragDropContext>

        <SlideArrowWrap onClick={() => handleScroll('right')} $disabled={showRightArrow}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </SlideArrowWrap>
      </SlideWrap>
  );
};

export default ImageUploadCard;
