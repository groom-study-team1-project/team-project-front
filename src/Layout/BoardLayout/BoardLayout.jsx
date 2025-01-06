import React from "react";
import {
  Container,
  MainContentWrapper,
  SidebarWrapper,
  Content,
} from "./BoardLayout.style";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import GlobalStyle from "../../assets/styles/GlobalStyle";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function BoardLayout({ isMyPage = false }) {
  const { isMobile, isTablet, isDesktop } = useSelector(
      (state) => state.screenSize
  );

  return (
      <>
        <GlobalStyle />
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
            </Content>
          </MainContentWrapper>
        </Container>
      </>
  );
}

export default BoardLayout;
