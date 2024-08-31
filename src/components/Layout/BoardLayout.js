import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1920px;
  max-width: 1920px;
  height: 100vh;
`;

const NavBar = styled.div`
  height: 50px;
  background-color: yellow;
  z-index: 1;
`;

const BodyContainer = styled.div`
  display: flex;
  flex: 1;
  z-index: 2;
`;

const LeftSideBar = styled.div`
  width: 200px;
  background-color: pink;
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
      <NavBar>NavBar</NavBar>
      <BodyContainer>
        <LeftSideBar>LeftSideBar</LeftSideBar>
        <Content>Content</Content>
        <RightSideBar>RightSideBar</RightSideBar>
      </BodyContainer>
    </Container>
  );
}

export default BoardLayout;
