import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 296px;
  height: ${(props) => (props.size === "인기 게시글" ? "426px" : "306px")};
  border-radius: 12px;
  padding: 20px;
  border: 1px solid black;
`;

const ContainerTitle = styled.h2`
  height: 20px;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  color: #333;
`;

const Divider = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0)
  );

  &:nth-last-child(1) {
    margin-bottom: 20px;
  }
`;

const PopularContainer = ({ text, children }) => {
  return (
    <Container props={text}>
      <ContainerTitle>{text}</ContainerTitle>
      <Divider />
      {children}
      <Divider />
    </Container>
  );
};

export default PopularContainer;
