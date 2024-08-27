import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid black;
`;

const ContainerTitle = styled.h2`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 30px;
  color: #333;
`;

const Divider = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0)
  );
`;

const PopularContainer = ({ children }) => {
  return (
    <Container>
      <ContainerTitle>인기 _____</ContainerTitle>
      <Divider />
      {children}
      <Divider />
    </Container>
  );
};

export default PopularContainer;
