import styled from "styled-components";

export const SlideWrap = styled.div`
  display: flex;
  background: rgba(239, 239, 239, 0.5);
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  gap: 1rem;
`;

export const ImgWrap = styled.div`
  display:flex;
  flex: 1;
  background: rgba(239, 239, 239, 0.5);
  padding: 20px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  overflow-x: auto;
  flex-shrink: 0;
`;

export const SlideArrowWrap = styled.div`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: white;
    z-index: 1;
    &:hover {
      opacity: 0.7;
      zoom: 1.2;
    }
`;

export const ImgAdd = styled.div`
  width: ${props => props.$isMobile ? '144px' : '288px'};
  display: flex;
  flex: 0 0 auto;
  align-items: center;  
  justify-content: center;
  margin: 0.5rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  ${(props) =>
    props.$isMobile
        ? `width: 144px; height: 80px;`
        : `width: 288px; height: 160px;`}

  &:hover {
    background-color: #f8f8f8;
    transition: all 0.2s ease;
    transform: translateY(-2px);
  }
`;

export const ImgPreviewWrap = styled.div`
  flex: 0 0 auto;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ImgPreview = styled.img`
  object-fit: fill;  
  border-radius: 5px;
  ${(props) =>
      props.$isMobile
          ? `width: 144px; height: 80px;`
          : `width: 288px; height: 160px;`}
`;

export const ImgPreviewDelete = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fff;
    color: #ff4444;
    transform: scale(1.1);
  }
`;