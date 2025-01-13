import  React, { useEffect, useState } from "react";
import {
  Container,
  MainContentWrapper,
  SidebarWrapper,
  Content, RightSidebarWrapper, PopularCardWrapper,
} from "./BoardLayout.style";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import GlobalStyle from "../../assets/styles/GlobalStyle";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import PopularHashCard from "../../components/Card/PopularCard/PopularHashCard/PopularHashCard";
import PopularPostCard from "../../components/Card/PopularCard/PopularPostCard/PopularPostCard";

function BoardLayout({ isMyPage = false }) {
  const { isMobile, isTablet, isDesktop } = useSelector(
      (state) => state.screenSize
  );


  // State to track accessToken
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    // Function to handle accessToken changes
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token); // Update state if token changes
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
      <>
        <GlobalStyle/>
        <Container>
          {isDesktop && (
              <SidebarWrapper>
                <Sidebar/>
              </SidebarWrapper>
          )}
          <MainContentWrapper>
            <Navbar key={accessToken}/>{" "}
            {/* Re-render Navbar when accessToken changes */}
            <Content>
              <Outlet/>
              {!isMyPage && !isMobile ? (
                  <RightSidebarWrapper>
                    <PopularCardWrapper>
                      <PopularPostCard/>
                    </PopularCardWrapper>
                    <PopularCardWrapper>
                      <PopularHashCard/>
                    </PopularCardWrapper>
                  </RightSidebarWrapper>
              ) : null}
            </Content>
          </MainContentWrapper>
        </Container>
      </>

  );
}

export default BoardLayout;
