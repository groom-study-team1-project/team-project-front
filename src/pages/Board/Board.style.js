import styled from "styled-components";

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: ${(props) => (props.$isMobile ? "2px" : props.$isTablet ? "5px" : "10px")};
  box-sizing: border-box;
  ${(props) =>
      props.$isDetail &&
      `
    display: flex;
    justify-content: center;
  `}
`;

export const PostCardWrapper = styled.div`
  display: ${(props) => (props.$noticePage ? `block` : `grid`)};
  margin-bottom: ${(props) => (props.$noticePage ? `40px` : `0px`)};
  grid-template-columns: ${(props) =>
      props.$isMobile
          ? `repeat(1, 1fr)`
          : props.$isTablet
              ? `repeat(2, 1fr)`
              : props.$projectPage
                  ? `repeat(4, 1fr)`
                  : `repeat(2, 1fr)`};
  gap: ${(props) =>
      props.$isMobile
          ? `10px`
          : props.$isTablet
              ? `20px`
              : props.$noticePage
                  ? `0px`
                  : `40px`};
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
      props.$isMobile
          ? "span 1"
          : props.$isTablet
              ? "span 2"
              : props.$projectPage
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
      props.$isMobile
          ? "span 1"
          : props.$isTablet
              ? "span 2"
              : props.$projectPage
                  ? "span 4"
                  : props.$noticePage
                      ? "span 1"
                      : "span 2"};
`;
