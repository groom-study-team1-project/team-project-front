import styled from "styled-components";

export const Wrap = styled.div`
  width: 1028px;
  margin: auto auto;
  font-size: 16px;
`;

export const WriteWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 111px;
  margin-bottom: 41px;
`;

export const BackImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
export const Write = styled.div`
  font-size: 40px;
`;
export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Titleinput = styled.input`
  width: 300%;
  height: 43px;
  border-radius: 10px;
  border: none;
  margin-bottom: 32px;
`;

export const Categoryselect = styled.select`
  width: 196px;
  height: 43px;
  border: none;
  border-radius: 10px;
`;

export const Hashtag = styled.input`
  border: none;
`;

export const SubmitBtnWrap = styled.div`
  float: right;
`;

export const SubmitBtn = styled.button`
  margin-left: 16px;
  width: 132px;
  height: 40px;
  border-radius: 10px;
  background: ${(props) => props.$bgColor};
  cursor: pointer;
  border: 1px solid ${(props) => props.$borderColor};
`;

export const ImgWrap = styled.div`
  display: flex;
  background: rgba(239, 239, 239, 0.5);

  margin-bottom: 16px;
  padding: 10px;
  overflow-x: auto;
  white-space: nowrap;
`;

export const ImgPreviewWrap = styled.div`
  position: relative;
`;
export const ImgPreview = styled.img`
  object-fit: cover;
  width: 288px;
  height: 160px;
  margin-right: 10px;
  margin-bottom: 10px; /* Space between images in case they wrap to the next line */
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
`;

export const Toolbar = styled.div`
  margin-bottom: 30px;
`;
