import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
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


    const defaultThumbnail = "https://via.placeholder.com/300x150?text=Popular+Post";

    const processContent = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        return doc.body.textContent || "";
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <SliderContainer>
            <CustomArrowWrapper>
                <Arrow className="prev" onClick={handlePrevClick}>
                    <ArrowImage src={PrevArrowImage} alt="Previous" />
                </Arrow>
                <Arrow className="next" onClick={handleNextClick}>
                    <ArrowImage src={NextArrowImage} alt="Next" />
                </Arrow>
            </CustomArrowWrapper>
            <Slider ref={sliderRef} {...sliderSettings}>
                {posts.map((post) => (
                    <SlideItem key={post.postId}>
                        <SlideImage
                            src={post.thumbnail || defaultThumbnail}
                            alt={post.title}
                            onClick={() => handleNavigateToPost(post.postId)}
                        />
                        <SlideContent onClick={() => handleNavigateToPost(post.postId)}>
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
