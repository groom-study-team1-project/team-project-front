import React from "react";
import NavBar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SearchSort from "../../components/SearchSort/SearchSort";
import {
  BoardTitle,
  Container,
  Content,
  ContentWrapper,
  MainContentWrapper,
  PopularCardWrapper,
  RightSidebarWrapper,
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
            <SearchSort onSearch={onSearchResults} pageType={pageType} />
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
