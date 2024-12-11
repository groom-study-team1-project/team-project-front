import styled from "styled-components";
import Slider from "react-slick";

export const ImgWrap = styled.div`
  background: rgba(239, 239, 239, 0.5);
  margin-bottom: 16px;
  padding: 10px;
`;

export const CustomSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slick-list {
    overflow: hidden;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-arrow {
    z-index: 2;
  }
`;

export const ImgPreviewWrap = styled.div`
  position: relative;
  margin-right: 10px;
`;

export const ImgPreview = styled.img`
  object-fit: cover;
  ${(props) =>
      props.$isMobile
          ? `width: 144px; height: 80px;`
          : `width: 288px; height: 160px;`}
`;

export const ImgPreviewDelete = styled.div`
  position: absolute;
  z-index: 30;
  top: 0;
  cursor: pointer;
  border-radius: 50%;
  background-color: gray;
  color: black;
  width: 20px;
  height: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
  opacity: 0.5;
  right: 0;
  &:hover {
    opacity: 1;
    color: white;
  }
`;

export const ImgAddWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImgAdd = styled.div`
  width: 288px;
  height: 160px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ccc;
  ${(props) =>
    props.$isMobile
        ? `width: 144px; height: 80px;`
        : `width: 288px; height: 160px;`}
`;

export const CustomArrow = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
`;
