import styled from "styled-components";

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  ${(props) =>
      props.$isDetail &&
      `
    display: flex;
    justify-content: center;
  `}
`;


export const BoardTitle = styled.div`
  width: ${(props) => (props.$projectPage ? `350px` : `264px`)};
  height: 48px;
  display: flex;
  margin-bottom: 48px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.5)
  );
`;

export const Title = styled.h1`
  background: linear-gradient(to bottom right, #0b0611, #47286f, #42469c);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
`;

export const SearchSortWrapper = styled.div`
  width: auto;
  height: 32px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const PostCardWrapper = styled.div`
  display: ${(props) => (props.$noticePage ? `block` : `grid`)};
  margin-bottom: ${(props) => (props.$noticePage ? `40px` : `0px`)};
  max-height: 830px;
  grid-template-columns: ${(props) =>
      props.$projectPage ? `repeat(4, 1fr)` : `repeat(2, 1fr)`};
  gap: ${(props) => (props.$noticePage ? `0px` : `40px`)};
  overflow-y: auto;
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

