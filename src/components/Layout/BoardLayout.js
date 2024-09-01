import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../Common/Navbar";
import SideBar from "../Common/SideBar";
import PopularPostCard from "../Common/PopularPostCard";
import PopularHashCard from "../Common/PopularHashCard";
import ProjectPostCard from "../Common/ProjectPostCard";
import CommunityPostCard from "../Common/CommunityPostCard";
import NoticePostCard from "../Feature/NoticePostCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1920px;
  max-width: 1920px;
  height: 100vh;
`;

const StyledNavbar = styled(NavBar)`
  z-index: 1;
`;

const MainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  z-index: 2;
`;

const ContentArea = styled.div`
  width: 100%;
  flex: 1;
`;

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

const ContentWrapper = styled.div`
  width: auto;
  height: auto;
  padding-left: 80px;
  padding-top: 40px;
`;
const RightSidebarWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  margin-top: 224px;
  margin-right: 94px;
`;

const CardWrapper = styled.div`
  margin-bottom: 40px;
`;

function BoardLayout() {
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

  const renderPostCard = () => {
    switch (location.pathname) {
      case "/community/projects":
        return <ProjectPostCard />;
      case "/community/notices":
        return <NoticePostCard />;
      default:
        if (location.pathname.startsWith("/community")) {
          return <CommunityPostCard />;
        }
        return null;
    }
  };

  return (
    <Container>
      <StyledNavbar isMainPage={false} />
      <MainContentWrapper>
        <SideBar />
        <ContentArea>
          <BoardTitle text={determineBoardTitle()}>
            {determineBoardTitle()}
          </BoardTitle>
          <SearchSortWrapper>
            <SearchBox>Search</SearchBox>
            <SortOption>최신순</SortOption>
          </SearchSortWrapper>
          <ContentWrapper>{renderPostCard()}</ContentWrapper>
        </ContentArea>
        <RightSidebarWrapper>
          <CardWrapper>
            <PopularPostCard />
          </CardWrapper>
          <CardWrapper>
            <PopularHashCard />
          </CardWrapper>
        </RightSidebarWrapper>
      </MainContentWrapper>
    </Container>
  );
}

export default BoardLayout;
