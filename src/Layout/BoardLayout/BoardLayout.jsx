import React from "react";
import {
  Container,
  MainContentWrapper,
  SidebarWrapper,
  Content,
  ContentWrapper,
  BoardTitle,
  SearchSortWrapper,
  SearchBox,
  SortOption,
  RightSidebarWrapper,
  PopularCardWrapper,
  PostCardWrapper,
} from "./BoardLayout.style";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import PopularHashCard from "../../components/Card/PopularCard/PopularHashCard/PopularHashCard";
import PopularPostCard from "../../components/Card/PopularCard/PopularPostCard/PopularPostCard";
import { sortPostsByCriteria } from "../../services/postApi";

function BoardLayout({ category, children }) {
  console.log(category);
  return (
    <Container>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      <MainContentWrapper>
        <Navbar />
        <Content>
          <ContentWrapper>
            <BoardTitle>{category.title}</BoardTitle>
            <SearchSortWrapper>
              <SearchBox>Search</SearchBox>
              <SortOption
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "date") {
                    sortPostsByCriteria(category.id, "date", 0);
                  } else if (value === "like") {
                    sortPostsByCriteria(category.id, "like", 0);
                  }
                }}
              >
                <option value="date">최신순</option>
                <option value="like">인기순</option>
              </SortOption>
            </SearchSortWrapper>
            <PostCardWrapper>{children}</PostCardWrapper>
          </ContentWrapper>

          <RightSidebarWrapper>
            <PopularCardWrapper>
              <PopularPostCard />
            </PopularCardWrapper>
            <PopularCardWrapper>
              <PopularHashCard />
            </PopularCardWrapper>
          </RightSidebarWrapper>
        </Content>
      </MainContentWrapper>
    </Container>
  );
}

export default BoardLayout;
