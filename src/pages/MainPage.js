import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1920px;
  height: 96vh;
  max-height: 100vh;
  margin: 0 auto;
  padding-top: 20px;
  border: 1px solid black;
`;

const Header = styled.header`
  padding: 20px;
  text-align: center;
  border: 1px solid black;
`;

const Content = styled.main`
  padding: 20px;
  margin-top: 155px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
`;

const LeftArea = styled.div`
  width: 500px;
  max-width: 520px;
  height: 100%;
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
  width: 220px;
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
`;

const RightArea = styled.div`
  width: 800px;
  max-height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  border: 1px solid black;
`;

const FirstPostCard = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  border: 1px solid black;
`;

const SecondPostCard = styled.div`
  height: 200px;
  grid-column: 2 / 4;
  grid-row: 2 / 3;
  border: 1px solid black;
  align-self: end;
`;

const ThirdPostCard = styled.div`
  height: 200px;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  border: 1px solid black;
`;

function MainPage() {
  return (
    <>
      <Container>
        <Header>네브바</Header>
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
            <Button to="/community/free">DeepDivers 게시판으로 바로가기</Button>
          </LeftArea>
          <RightArea>
            <FirstPostCard>PostCard1</FirstPostCard>
            <SecondPostCard>PostCard2</SecondPostCard>
            <ThirdPostCard>PostCard3</ThirdPostCard>
          </RightArea>
        </Content>
      </Container>
    </>
  );
}

export default MainPage;
