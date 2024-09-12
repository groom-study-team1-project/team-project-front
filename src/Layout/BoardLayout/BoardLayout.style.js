import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarWrapper = styled.div`
  flex-shrink: 0;
`;

export const MainContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  margin-right: 50px;
`;

export const Content = styled.div`
  display: flex;
  padding: 80px;
`;

export const BoardTitle = styled.div`
  width: 264px;
  height: 48px;
  display: flex;
  margin-bottom: 48px;
  border: 1px solid black;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`;

export const SearchSortWrapper = styled.div`
  width: auto;
  height: 32px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  margin-bottom: 48px;
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
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

export const RightSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 176px;
`;

export const PopularCardWrapper = styled.div`
  margin-bottom: 40px;
`;
