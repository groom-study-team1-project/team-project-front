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
  text-align: center;
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
          <LeftArea>LeftArea</LeftArea>
          <RightArea>RightArea</RightArea>
        </Content>
      </Container>
    </>
  );
}

export default MainPage;
