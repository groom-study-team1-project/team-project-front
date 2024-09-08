import React from "react";
import NavBar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import {
  BoardTitle,
  Container,
  Content,
  ContentWrapper,
  MainContentWrapper,
  PopularCardWrapper,
  RightSidebarWrapper,
  SearchBox,
  SearchSortWrapper,
  SortOption,
} from "../BoardLayout/BoardLayout.style";
import PopularPostCard from "../../components/Card/PopularCard/PopularPostCard/PopularPostCard";
import PopularHashCard from "../../components/Card/PopularCard/PopularHashCard/PopularHashCard";
import PostLineLayout from "../PostLineLayout/PostLineLayout";

function BoardLayout({ postCards, pageType, onSearchResults }) {
  const boardTitle = () => {
    if (pageType) {
      switch (pageType) {
        case "projects":
          return "프로젝트 게시판";
        case "notices":
          return "공지사항";
        case "free":
          return "자유게시판";
        case "questions":
          return "질문게시판";
        default:
          return null;
      }
    }
  };
  return (
    <Container>
      <Sidebar />
      <MainContentWrapper>
        <NavBar isMainPage={false} />
        <ContentWrapper>
          <Content>
            <BoardTitle $pageType={pageType}>{boardTitle()}</BoardTitle>
            <SearchSortWrapper>
              <SearchBox>Search</SearchBox>
              <SortOption>최신순</SortOption>
            </SearchSortWrapper>
            <PostLineLayout pageType={pageType} postCards={postCards} />
          </Content>
          <RightSidebarWrapper>
            <PopularCardWrapper>
              <PopularPostCard />
            </PopularCardWrapper>
            <PopularCardWrapper>
              <PopularHashCard />
            </PopularCardWrapper>
          </RightSidebarWrapper>
        </ContentWrapper>
      </MainContentWrapper>
    </Container>
  );
}

export default BoardLayout;

<SearchSortWrapper>
  <SearchBox>Search</SearchBox>
  <SortOption>최신순</SortOption>
</SearchSortWrapper>;
