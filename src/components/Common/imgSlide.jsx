import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
const CustomSlider = styled(Slider)`
  margin-left: 5%;
  margin-right: 5%;
  .slick-slide img {
    display: block;
    padding: 15px;
    pointer-events: none;

    object-fit: cover;
    ${(props) =>
      props.$isMobile
        ? `width: 125px;
      height: 50px;`
        : `width: 296px;
    height: 176px;`}
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
  const { isMobile } = useSelector((state) => state.screenSize);
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
    dots: false,
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    draggable: false,
  };

  return (
    <div>
      <CustomSlider {...settings} $isMobile={isMobile}>
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
