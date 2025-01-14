import styled from "styled-components";

export const SliderContainer = styled.div`
    display: block;
    width: 100%;
    height: ${({ isMobile }) => (isMobile ? "300px" : "400px")};
    margin: 0 auto 48px;
    position: relative;
    border-radius: ${({ isMobile }) => (isMobile ? "8px" : "10px")};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to right, #e5e5f7, #acb6e5);

    .slick-dots {
        position: absolute;
        bottom: 20px;
        display: flex !important;
        justify-content: center;
        list-style: none;

        li {
            margin: 0 5px;
        }

        button {
            width: 12px;
            height: 12px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            border: none;
            cursor: pointer;
            transition: background 0.3s;

            &:hover,
            &.slick-active {
                background: #000;
            }
        }
    }

    .slick-track {
        display: flex !important;
        width: 100% !important;
    }

    .slick-slide {
        flex: 1 0 auto;
        width: 100% !important;
    }

    @media (max-width: 768px) { /* 모바일 화면을 위한 조건 */
        height: 300px;
        border-radius: 8px;
    }
`;

export const SlideItem = styled.div`
    display: flex !important;
    flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
    align-items: center;
    height: ${({ isMobile }) => (isMobile ? "300px" : "400px")};
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to right, #e5e5f7, #acb6e5);
`;

export const SlideImage = styled.img`
    width: ${({ isMobile }) => (isMobile ? "100%" : "70%")};
    height: ${({ isMobile }) => (isMobile ? "70%" : "100%")};
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
`;

export const SlideContent = styled.div`
    width: ${({ isMobile }) => (isMobile ? "100%" : "30%")};
    height: ${({ isMobile }) => (isMobile ? "30%" : "auto")};
    display: flex;
    flex-direction: column;
    padding-left: ${({ isMobile }) => (isMobile ? "20px" : "20px")};
    padding-top: ${({ isMobile }) => (isMobile ? "20px" : "0px")};
`;


export const SlideTitle = styled.h4`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

export const SlideDescription = styled.p`
    margin: 0;
    font-size: 16px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

export const CustomArrowWrapper = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    z-index: 10;
    pointer-events: none;
`;

export const Arrow = styled.div`
    pointer-events: all;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.prev {
        margin-left: 20px;
    }

    &.next {
        margin-right: 20px;
    }
`;

export const ArrowImage = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
    user-select: none;
`;
