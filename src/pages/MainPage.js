import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1920px;
  height: 95vh;
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
  justify-content: space-around;
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
  border: 1px solid black;
`;

const LeftArea = styled.div`
  width: 400px;
  max-width: 520px;
  border: 1px solid black;
`;

const RightArea = styled.div`
  width: 800px;
  max-height: 500px;
  padding: 20px;
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
          </LeftArea>
          <RightArea>RightArea</RightArea>
        </Content>
      </Container>
    </>
  );
}

export default MainPage;
