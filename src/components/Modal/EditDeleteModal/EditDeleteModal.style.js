import styled from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const Modal = styled.div`
  ${(props) =>
    props.$isMobile
      ? `width: 25px;
  height: 25px;
  right:-2px;
  `
      : `width: 80px;
  height: 40px;
  left: 2px;
  `}

  border: 1px solid black;
  border-radius: 10px;
  background: white;
  padding: 10px;
  position: absolute;
  top: 20px;
  z-index: 9999;
  div {
    cursor: pointer;
  }
  hr {
    margin: 3px;
    padding: 0px;
    width: 100%;
  }
`;
