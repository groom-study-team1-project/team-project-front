import React from "react";
import styled from "styled-components";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/SideBar";
import Popularpostcard from "../Common/PopularPostCard";
import Popularhashcard from "../Common/PopularHashCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1920px;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const LeftSideBar = styled(Sidebar)`
  position: fixed;
`;

const Content = styled.div`
  flex: 1;
  margin-top: 82px;
`;

const Boardtitle = styled.div`
  width: ${(props) => (props.size === "project" ? "264px" : "200px")};
  height: 48px;
  border: 1px solid black;
  border-radius: 20px;
  margin-top: 56px;
  margin-left: 24px;
`;

const RightSideBar = styled.div`
  width: auto; /* 오른쪽 사이드바 넓이 조정 */
  display: flex;
  flex-direction: column;
  margin-top: 224px;
  margin-right: 94px;
`;

const Popularcard = styled.div`
  margin-bottom: 40px;
`;

function BoardLayout({ title }) {
  return (
    <Container>
      <MainContent>
        <LeftSideBar />
        <Content>
          <Boardtitle>{title}</Boardtitle>
        </Content>
        <RightSideBar>
          <Popularcard>
            <Popularpostcard />
          </Popularcard>
          <Popularcard>
            <Popularhashcard />
          </Popularcard>
        </RightSideBar>
      </MainContent>
    </Container>
  );
}

export default BoardLayout;
