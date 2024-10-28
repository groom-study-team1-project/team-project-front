import styled from "styled-components";

export const ImgWrap = styled.div`
  display: flex;
  background: rgba(239, 239, 239, 0.5);
  margin-bottom: 16px;
  padding: 10px;
  overflow-x: scroll;
  white-space: nowrap;
  height: ${(isMobile) => isMobile && "height: 80px;"};
`;

export const ImgPreviewWrap = styled.div`
  position: relative;
`;
export const ImgPreview = styled.img`
  object-fit: cover;

  ${(props) =>
    props.isMobile
      ? `width: 144px;
    height: 80px;`
      : `width: 288px;
  height: 160px;`}
  margin-right: 10px;
  flex-shrink: 0;
  cursor: pointer;
  object-fit: contain;
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
  margin-right: 12px;
  margin-top: 2px;
  &:hover {
    opacity: 1;
    color: white;
  }
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
  position: relative;
  flex-shrink: 0;
  ${(props) =>
    props.isMobile
      ? `width: 144px;
    height: 80px;`
      : `width: 288px;
  height: 160px;`}
`;
