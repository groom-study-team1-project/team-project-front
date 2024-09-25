import React from "react";
import {
  Container,
  MainContentWrapper,
  SidebarWrapper,
  Content,
  RightSidebarWrapper,
  PopularCardWrapper,
} from "./BoardLayout.style";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import PopularHashCard from "../../components/Card/PopularCard/PopularHashCard/PopularHashCard";
import PopularPostCard from "../../components/Card/PopularCard/PopularPostCard/PopularPostCard";
import { Outlet } from "react-router-dom";

function BoardLayout({ category = { title: "프로젝트 게시판", id: 3 } }) {
  console.log(category);
  return (
    <Container>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      <MainContentWrapper>
        <Navbar />
        <Content>
          <Outlet />

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
