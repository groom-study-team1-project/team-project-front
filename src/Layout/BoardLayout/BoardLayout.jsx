import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import PopularPostCard from "../components/Card/PopularCard/PopularPostCard/PopularPostCard";
import PopularHashCard from "../components/Card/PopularCard/PopularHashCard/PopularHashCard";
import {
  BoardTitle,
  Container,
  Content,
  ContentWrapper,
  MainContentWrapper,
  PopularCardWrapper,
  PostCardWrapper,
  RightSidebarWrapper,
  SearchBox,
  SearchSortWrapper,
  SidebarWrapper,
  SortOption,
} from "../BoardLayout/BoardLayout.style";

function BoardLayout({ postCards }) {
  const location = useLocation();

  const determineBoardTitle = () => {
    switch (location.pathname) {
      case "/community/projects":
        return "프로젝트 게시판";
      case "/community/notices":
        return "공지사항";
      case "/community/free":
        return "자유게시판";
      case "/community/questions":
        return "질문게시판";
      default:
        return null;
    }
  };
  const isProjectBoard = determineBoardTitle() === "프로젝트 게시판";

  return (
    <Container>
      <SidebarWrapper />
      <MainContentWrapper>
        <NavBar isMainPage={false} />
        <ContentWrapper>
          <Content>
            <BoardTitle text={determineBoardTitle()}>
              {determineBoardTitle()}
            </BoardTitle>

            <SearchSortWrapper>
              <SearchBox>Search</SearchBox>
              <SortOption>최신순</SortOption>
            </SearchSortWrapper>

            <PostCardWrapper isProjectBoard={isProjectBoard}>
              {postCards}
            </PostCardWrapper>
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
