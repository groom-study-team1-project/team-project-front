import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 1920px;
  max-width: 1920px;
  height: 100vh;
`;

export const MainContentWrapper = styled.div`
  width: auto;
  flex: 1;
  z-index: 2;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-left: 320px;
`;

export const Content = styled.div``;

export const BoardTitle = styled.div`
  width: ${(props) => (props.text === "프로젝트 게시판" ? "264px" : "200px")};
  height: 48px;
  display: flex;
  border: 1px solid black;
  border-radius: 20px;
  margin-top: 145px;
  margin-left: 24px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`;

export const SearchSortWrapper = styled.div`
  width: auto;
  height: 32px;
  display: flex;
  margin-top: 50px;
  margin-left: 80px;
  margin-right: 150px;
  justify-content: space-between;
  border: 1px solid black;
`;

export const SearchBox = styled.div`
  width: 378px;
  height: 32px;
  border: 1px solid blue;
`;

export const SortOption = styled.div`
  width: 80px;
  height: 24px;
  border: 1px solid blue;
  align-self: flex-end;
`;

export const PostCardWrapper = styled.div`
  width: 990px;
  max-width: 1190px;
  margin-left: 80px;
  padding-top: 40px;
  margin-right: 150px;

  ${(props) =>
    props.isProjectBoard &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    `}
`;

export const RightSidebarWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  margin-top: 224px;
  margin-right: 94px;
`;

export const PopularCardWrapper = styled.div`
  margin-bottom: 40px;
`;
