import React from "react";
import styled from "styled-components";
import NavBar from "../Common/Navbar";
import Sidebar from "../Common/SideBar";
import PopularPostCard from "../Common/PopularPostCard";
import PopularHashCard from "../Common/PopularHashCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1920px;
  max-width: 1920px;
  height: 100vh;
`;

const Navbar = styled(NavBar)`
  z-index: 1;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  z-index: 2;
`;

const LeftSideBar = styled(Sidebar)`
  position: fixed;
`;

const Content = styled.div`
  flex: 1;
  background-color: white;
  border: 2px solid red;
`;

const RightSideBar = styled.div`
  width: 200px;
  background-color: lightgreen;
`;

function BoardLayout() {
  return (
    <Container>
      <Navbar />
      <MainContainer>
        <LeftSideBar />
        <Content>Content</Content>
        <RightSideBar>RightSideBar</RightSideBar>
      </MainContainer>
    </Container>
  );
}

export default BoardLayout;
