import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const CustomSlider = styled(Slider)`
  margin: 25px;

  .slick-slide img {
    display: block;
    padding: 15px;
    pointer-events: none;
    width: 296px;
    height: 176px;
    object-fit: cover;
  }

  .slick-arrow {
    display: none;
  }

  .slick-arrow::before {
    display: none;
  }
`;

const CustomArrow = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #000;
  cursor: pointer;
  z-index: 3;

  &:hover {
    color: #000;
  }
`;

function Slide({ imgUrls }) {
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  const settings = {
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
    dots: true,
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    draggable: false,
  };

  return (
    <div>
      <CustomSlider {...settings}>
        {imgUrls.map((imgurl) => (
          <div key={imgurl.id}>
            <img src={imgurl.url} alt={`Slide ${imgurl.id}`} />
          </div>
        ))}
      </CustomSlider>
    </div>
  );
}

export default Slide;
