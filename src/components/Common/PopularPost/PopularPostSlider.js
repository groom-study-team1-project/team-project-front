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
} from "./PopularPostSlider.style";

import PrevArrowImage from "../../../assets/images/arrow-left.png";
import NextArrowImage from "../../../assets/images/arrow-right.png";

const PopularPostSlider = ({ posts }) => {
    const sliderRef = React.useRef(null);
    const navigate = useNavigate();

    const screenSize = useSelector((state) => state.screenSize);

    const handlePrevClick = () => sliderRef.current.slickPrev();
    const handleNextClick = () => sliderRef.current.slickNext();

    const handleNavigateToPost = (postId) => {
        navigate(`/board/detail/${postId}`);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const processContent = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        return doc.body.textContent || "";
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const defaultThumbnailUrl = "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/default-image/posts/thumbnail.png";

    return (
        <SliderContainer $isMobile={screenSize.isMobile}>
            <CustomArrowWrapper>
                <Arrow className="prev" onClick={handlePrevClick}>
                    <ArrowImage src={PrevArrowImage} alt="Previous"/>
                </Arrow>
                <Arrow className="next" onClick={handleNextClick}>
                    <ArrowImage src={NextArrowImage} alt="Next"/>
                </Arrow>
            </CustomArrowWrapper>
            <Slider ref={sliderRef} {...sliderSettings}>
                {posts.map((post) => (
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
                            $isMobile={screenSize.isMobile}>
                            <SlideTitle>{truncateText(post.title, 30)}</SlideTitle>
                            <SlideDescription>{truncateText(processContent(post.content), 100)}</SlideDescription>
                        </SlideContent>
                    </SlideItem>
                ))}
            </Slider>
        </SliderContainer>
    );
};

export default PopularPostSlider;
