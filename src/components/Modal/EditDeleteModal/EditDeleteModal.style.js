import styled from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const Modal = styled.div`
  width: 80px;
  height: 40px;
  border: 1px solid black;
  border-radius: 10px;
  background: white;
  padding: 10px;
  position: absolute;
  top: 20px;
  left: 2px;
  div {
    cursor: pointer;
  }
`;
