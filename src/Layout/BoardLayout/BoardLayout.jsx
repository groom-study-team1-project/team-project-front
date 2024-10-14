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
import { useMediaQuery } from "react-responsive";
function BoardLayout({ isMyPage = false }) {
  const isMobile = useMediaQuery({
    query: "(max-width:1024px)",
  });
  return (
    <Container>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      <MainContentWrapper>
        <Navbar isMobail={isMobile} />
        <Content>
          <Outlet />
          {!isMyPage ? (
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
