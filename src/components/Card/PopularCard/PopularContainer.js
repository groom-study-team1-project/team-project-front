import React from "react";
import styled from "styled-components";
import { Divider } from "../Card.style";

export const Container = styled.div`
  width: 256px;
  height: ${(props) => (props.text === "인기 게시글" ? "406px" : "286px")};
  border-radius: 10px;
  padding: 20px;
  padding-top: 30px;
  border: 1px solid black;
`;

export const ContainerTitle = styled.h2`
  font-weight: bold;
  font-size: 16px;
  margin-top: 4px;
  color: #333;
`;

export const PopularContainer = ({ text, children }) => {
  return (
    <Container text={text}>
      <ContainerTitle>{text}</ContainerTitle>
      <Divider />
      {children}
      <Divider />
    </Container>
  );
};

export default PopularContainer;
