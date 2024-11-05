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
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
function BoardLayout({ isMyPage = false }) {
  const { isMobile, isTablet, isDesktop } = useSelector(
    (state) => state.screenSize
  );
  return (
    <Container>
      {isDesktop && (
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
      )}
      <MainContentWrapper>
        <Navbar />
        <Content>
          <Outlet />
          {!isMyPage && !isMobile ? (
            <RightSidebarWrapper>
              <PopularCardWrapper>
                <PopularPostCard />
              </PopularCardWrapper>
              <PopularCardWrapper>
                <PopularHashCard />
              </PopularCardWrapper>
            </RightSidebarWrapper>
          ) : null}
        </Content>
      </MainContentWrapper>
    </Container>
  );
}

export default BoardLayout;
