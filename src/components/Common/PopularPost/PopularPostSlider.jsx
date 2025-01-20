import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  SliderContainer,
  SlideItem,
  SlideImage,
  SlideContent,
  SlideTitle,
  SlideDescription,
  CustomArrowWrapper,
  Arrow,
  ArrowImage,
  CustomDots,
  Dot,
  Ranking,
} from "./PopularPostSlider.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import PrevArrowImage from "../../../assets/images/arrow-left.png";
import NextArrowImage from "../../../assets/images/arrow-right.png";
const PopularPostSlider = ({ posts }) => {
  const sliderRef = React.useRef(null);
  const navigate = useNavigate();

  const screenSize = useSelector((state) => state.screenSize);

  const [currentSlide, setCurrentSlide] = React.useState(0); // 현재 슬라이드 상태 추가

  const handlePrevClick = () => sliderRef.current.slickPrev();
  const handleNextClick = () => sliderRef.current.slickNext();

  const handleNavigateToPost = (postId) => {
    navigate(`/board/detail/${postId}`);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500, // 슬라이드 전환 애니메이션 시간
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 자동 전환 시간 (3초)
    pauseOnHover: false, // 호버 시 멈추지 않도록 설정
    pauseOnFocus: false, // 포커스 시 멈추지 않도록 설정
    lazyLoad: "ondemand", // 필요한 슬라이드만 로드
    adaptiveHeight: false, // 높이 변경 비활성화
    arrows: false, // 화살표는 커스텀 핸들러로 처리
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const processContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const defaultThumbnailUrl =
    "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/default-image/posts/thumbnail.png";

  return (
    <SliderContainer $isMobile={screenSize.isMobile}>
      <CustomArrowWrapper>
        <Arrow className="prev" onClick={handlePrevClick}>
          <ArrowImage src={PrevArrowImage} alt="Previous" />
        </Arrow>
        <Arrow className="next" onClick={handleNextClick}>
          <ArrowImage src={NextArrowImage} alt="Next" />
        </Arrow>
      </CustomArrowWrapper>
      <Slider ref={sliderRef} {...sliderSettings}>
        {posts.map((post, index) => (
          <SlideItem key={post.postId} $isMobile={screenSize.isMobile}>
            <SlideImage
              src={
                post.thumbnail === "posts/thumbnail.png" || !post.thumbnail
                  ? defaultThumbnailUrl
                  : post.thumbnail
              }
              alt={post.title}
              onClick={() => handleNavigateToPost(post.postId)}
              $isMobile={screenSize.isMobile}
            />
            <SlideContent
              onClick={() => handleNavigateToPost(post.postId)}
              $isMobile={screenSize.isMobile}
            >
              <Ranking>
                <FontAwesomeIcon
                  icon={faFire}
                  size="2xl"
                  style={{ color: "rgba(255, 0, 0, 0.5)" }}
                />
                <span>{index + 1}</span>
              </Ranking>
              <SlideTitle>{truncateText(post.title, 30)}</SlideTitle>
              <SlideDescription>
                {truncateText(processContent(post.content), 100)}
              </SlideDescription>
            </SlideContent>
          </SlideItem>
        ))}
      </Slider>
      <CustomDots>
        {posts.map((_, index) => (
          <Dot
            key={index}
            onClick={() => sliderRef.current.slickGoTo(index)}
            active={currentSlide === index} // 활성 상태 동기화
          />
        ))}
      </CustomDots>
    </SliderContainer>
  );
};

export default PopularPostSlider;
