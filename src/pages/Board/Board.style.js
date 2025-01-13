import styled from "styled-components";

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 10px; /* 추가된 스타일 */
  box-sizing: border-box; /* padding 포함하여 크기 계산 */
  ${(props) =>
      props.$isDetail &&
      `
    display: flex;
    justify-content: center;
  `}
`;

export const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative; /* 스크롤 감지용 컨테이너 */
`;

export const PostCardWrapper = styled.div`
  display: ${(props) => (props.$noticePage ? `block` : `grid`)};
  margin-bottom: ${(props) => (props.$noticePage ? `40px` : `0px`)};
  grid-template-columns: ${(props) =>
      props.$projectPage ? `repeat(4, 1fr)` : `repeat(2, 1fr)`};
  gap: ${(props) => (props.$noticePage ? `0px` : `40px`)};
  position: relative;
  
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const EndMessage = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: ${(props) =>
      props.$projectPage
          ? "span 4"
          : props.$noticePage
              ? "span 1"
              : "span 2"};
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: ${(props) =>
      props.$projectPage
          ? "span 4"
          : props.$noticePage
              ? "span 1"
              : "span 2"};
`;

