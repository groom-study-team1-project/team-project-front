import React from "react";
import styled from "styled-components";
import { Divider } from "../Card.style";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 256px;
  height: ${(props) => (props.text === "인기 게시글" ? "406px" : "286px")};
  padding: 20px;
  padding-top: 30px;

  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.5)
  );

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.1),
    0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);

  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    border: 1px solid transparent;
    background: linear-gradient(
        10deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

export const ContainerTitle = styled.h2`
  font-weight: bold;
  font-size: 16px;
  margin-top: 4px;
  color: #333;
`;

export const ContainerCard = styled.h2`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PopularContainer = ({ text, children }) => {
  return (
    <Container text={text}>
      <ContainerTitle>{text}</ContainerTitle>
      <Divider />
      <ContainerCard>{children}</ContainerCard>
      <Divider />
    </Container>
  );
};

export default PopularContainer;
