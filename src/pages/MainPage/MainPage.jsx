import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import redirectIcon from "../assets/images/redirect-to-board.png";
import ProjectPostCard from "../../components/Common/ProjectPostCard";
import CommunityPostCard from "../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";

const Container = styled.div`
  max-width: 1920px;
  max-height: 100vh;
  margin: 0;
  padding-top: 20px;
  border: 1px solid black;
`;

// 콘텐츠
const Content = styled.main`
  height: auto;
  padding: 20px;
  margin-top: 155px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
`;

// 왼쪽 콘텐츠(타이틀&게시판버튼)
const LeftArea = styled.div`
  width: 500px;
  max-width: 520px;
  height: auto;
  margin-top: -100px;
  border: 1px solid black;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #343a40;
  border: 1px solid black;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SubTitle = styled.h1`
  font-style: black;
  border: 1px solid black;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Detail = styled.p`
  font-size: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
`;

const Button = styled(Link)`
  width: 240px;
  color: #000000;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ededed;
  }

  img {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    margin-top: 1px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: translateX(5px);
  }
`;

// 오른쪽 콘텐츠(포스트카드)
const RightArea = styled.div`
  padding: 20px;
  margin-right: 90px;
  border: 1px solid black;
`;

const PostCardLine = styled.div`
  display: flex;
  border: 1px solid black;
`;

const PostCard = styled.div`
  margin: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
`;

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
