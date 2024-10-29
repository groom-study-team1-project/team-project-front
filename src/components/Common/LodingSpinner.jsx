import React from "react";
import { PulseLoader, DotLoader, BarLoader } from "react-spinners";
import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5vh;
  flex-direction: column;
`;

export const PulseLoading = () => {
  return (
    <>
      <Wrap>
        <PulseLoader size={20} />
      </Wrap>
    </>
  );
};

export const DotLoading = () => {
  return (
    <>
      <Wrap>
        <DotLoader size={100} />
      </Wrap>
    </>
  );
};

export const BarLoading = () => {
  return (
    <>
      <Wrap>
        <BarLoader size={100} />
      </Wrap>
    </>
  );
};
