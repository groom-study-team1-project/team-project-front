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

function BoardLayout({ title, children }) {
  console.log(title);
  return (
    <Container>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      <MainContentWrapper>
        <Navbar />
        <Content>
          <ContentWrapper>
            <BoardTitle>{title}</BoardTitle>
            <SearchSortWrapper>
              <SearchBox></SearchBox>
              <SortOption></SortOption>
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
