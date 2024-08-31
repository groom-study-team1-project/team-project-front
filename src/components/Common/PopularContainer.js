import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 256px;
  height: ${(props) => (props.text === "인기 게시글" ? "406px" : "286px")};
  border-radius: 10px;
  padding: 20px;
  padding-top: 30px;
  border: 1px solid black;
`;

const ContainerTitle = styled.h2`
  font-size: 18px;
  margin-top: 4px;
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
`;

const PopularContainer = ({ text, children }) => {
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
