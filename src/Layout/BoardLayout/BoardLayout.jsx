import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
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
  SortOption,
} from "../BoardLayout/BoardLayout.style";
import PopularPostCard from "../../components/Card/PopularCard/PopularPostCard/PopularPostCard";
import PopularHashCard from "../../components/Card/PopularCard/PopularHashCard/PopularHashCard";
import Sidebar from "../Sidebar/Sidebar";
import { sortPostsByCriteria } from "../../services/postApi";

function BoardLayout({ postCards }) {
  const location = useLocation();

  const determineBoardTitle = () => {
    switch (location.pathname) {
      case "/community/projects":
        return { id: 1, title: "프로젝트 자랑 게시판" };
      case "/community/notices":
        return { id: 3, title: "공지사항" };
      case "/community/free":
        return { id: 0, title: "자유게시판" };
      case "/community/questions":
        return { id: 2, title: "질문게시판" };
      default:
        return null;
    }
  };
  const boardTitle = determineBoardTitle();
  const isProjectBoard = boardTitle.title === "프로젝트 게시판";
  return (
    <Container>
      <Sidebar />
      <MainContentWrapper>
        <NavBar isMainPage={false} />
        <ContentWrapper>
          <Content>
            <BoardTitle $boardType={boardTitle.title}>
              {boardTitle.title}
            </BoardTitle>

            <SearchSortWrapper>
              <SearchBox>Search</SearchBox>
              <SortOption
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "date") {
                    sortPostsByCriteria(boardTitle.id, "date", 0);
                  } else if (value === "like") {
                    sortPostsByCriteria(boardTitle.id, "like", 0);
                  }
                }}
              >
                <option value="date">최신순</option>
                <option value="like">인기순</option>
              </SortOption>
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
