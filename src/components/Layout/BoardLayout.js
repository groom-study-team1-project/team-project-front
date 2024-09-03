import React from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import NavBar from "../Common/Navbar";
import SideBar from "../Common/SideBar";
import PopularPostCard from "../Common/PopularPostCard";
import PopularHashCard from "../Common/PopularHashCard";
import ProjectPostCard from "../Common/ProjectPostCard";
import CommunityPostCard from "../Common/CommunityPostCard";
import NoticePostCard from "../Feature/NoticePostCard";

const Container = styled.div`
  display: flex;
  width: 1920px;
  max-width: 1920px;
  height: 100vh;
`;

const SidebarWrapper = styled(SideBar)``;

const MainContentWrapper = styled.div`
  width: auto;
  flex: 1;
  z-index: 2;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-left: 320px;
`;

const Content = styled.div``;

const BoardTitle = styled.div`
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

const SearchSortWrapper = styled.div`
  width: auto;
  height: 32px;
  display: flex;
  margin-top: 50px;
  margin-left: 80px;
  margin-right: 150px;
  justify-content: space-between;
  border: 1px solid black;
`;

const SearchBox = styled.div`
  width: 378px;
  height: 32px;
  border: 1px solid blue;
`;

const SortOption = styled.div`
  width: 80px;
  height: 24px;
  border: 1px solid blue;
  align-self: flex-end;
`;

const PostCardWrapper = styled.div`
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

const RightSidebarWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  margin-top: 224px;
  margin-right: 94px;
`;

const PopularCardWrapper = styled.div`
  margin-bottom: 40px;
`;

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
