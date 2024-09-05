import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../../Layout/Navbar/Navbar";
import redirectIcon from "../../assets/images/redirect-to-board.png";
import ProjectPostCard from "../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
import CommunityPostCard from "../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";

function MainPage() {
  console.log("b" + "a" + +"a");
  return (
    <>
      <Container>
        <Navbar isMainPage={true} isLoggedIn={false} />
        <Content>
          <LeftArea>
            <Title>DeepDivers</Title>
            <SubTitle>
              다양한 게시판을 통해
              <br />
              여러분만의 이야기를 공유하고,
              <br />
              새로운 인연을 만날 수 있습니다.
            </SubTitle>
            <Detail>
              우리는 구름 DeepDive에 참여하는 여러분에 대해 열정적으로
              이야기하고,
              <br />
              서로를 지원하며 함께 성장하는 커뮤니티를 만듭니다. 전문가의 조언,
              친근한
              <br /> 네트워크, 유익한 자료와 활동으로 커뮤니티에서 유익한 시간을
              보내세요.
            </Detail>
            <Button to="/community/free">
              DeepDivers 게시판으로 바로가기
              <img src={redirectIcon} alt="Redirect to board" />
            </Button>
          </LeftArea>
          <RightArea>
            <PostCardLine>
              <PostCard>
                <ProjectPostCard />
              </PostCard>
              <PostCard>PostCard</PostCard>
            </PostCardLine>
            <PostCardLine>
              <PostCard>
                <CommunityPostCard />
              </PostCard>
            </PostCardLine>
          </RightArea>
        </Content>
      </Container>
    </>
  );
}

export default MainPage;
