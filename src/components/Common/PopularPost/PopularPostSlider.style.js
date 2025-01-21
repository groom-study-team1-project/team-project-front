import styled from "styled-components";

export const SliderContainer = styled.div`
  display: block;
  width: 100%;
  aspect-ratio: ${({ $isMobile }) => ($isMobile ? "4 / 3" : "7 / 2")};
  max-height: ${({ $isMobile }) => ($isMobile ? "300px" : "650px")};
  margin: 0 auto 48px;
  position: relative;
  border-radius: ${({ $isMobile }) => ($isMobile ? "8px" : "10px")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: ${({ isDarkMode }) =>
            isDarkMode
                    ? "linear-gradient(\n    to bottom,\n    rgba(0, 0, 0, 0.6),\n    rgba(0, 0, 0, 0.5)\n  );"
                    : "linear-gradient(\n    to top,\n    rgba(244, 244, 244, 0.7),\n    rgba(244, 244, 244, 0.3)\n  );"};
    
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

  @media (max-width: 768px) {
    height: 300px;
    border-radius: 8px;
  }
`;

export const SlideItem = styled.div`
  display: flex !important;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  align-items: center;
  aspect-ratio: ${({ $isMobile }) => ($isMobile ? "4 / 3" : "7 / 2")};
  max-height: ${({ $isMobile }) => ($isMobile ? "300px" : "650px")};
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const Ranking = styled.div`
  display: flex;
  position: absolute;
  width: 3.5%;
  top: 3%;
  left: 1%;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  aspect-ratio: 1/1;
  padding: 0.5%;
  background: rgba(255, 255, 255, 0.3);
  span {
    font-size: 130%;
    margin-left: 10%;
  }
    color: black;
`;

export const SlideImage = styled.img`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "70%")};
  height: ${({ $isMobile }) => ($isMobile ? "70%" : "100%")};
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`;

export const SlideContent = styled.div`
  margin-bottom: 7%;
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "30%")};
  height: ${({ $isMobile }) => ($isMobile ? "30%" : "auto")};
  display: flex;
  flex-direction: column;
  padding-left: ${({ $isMobile }) => ($isMobile ? "20px" : "20px")};
  padding-top: ${({ $isMobile }) => ($isMobile ? "20px" : "0px")};
`;

export const SlideTitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
    color: ${({isDarkMode}) =>
            isDarkMode
                    ? "while"
                    : "#333"};
`;

export const SlideDescription = styled.p`
  margin: 0;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
    color: ${({ isDarkMode }) =>
            isDarkMode
                    ? "while"
                    : "#666"};
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

export const CustomDots = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Dot = styled.div`
    width: 12px;
    height: 12px;
    background: ${({ active, isDarkMode }) =>
            isDarkMode
                    ? (active ? "#fff" : "rgba(0, 0, 0, 0.3)")
                    : (active ? "#000" : "rgba(0, 0, 0, 0.3)")};
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
    
  &:hover {
    background: #000;
  }
`;
