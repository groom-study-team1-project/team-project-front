import styled, { keyframes } from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const dropdownShow = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const dropdownHide = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

export const Modal = styled.div`
  ${(props) =>
      props.$isMobile
          ? `width: 25px;
  height: 25px;
  right:-2px;
  `
          : `width: 40px;
  height: 40px;
  left: 2px;
  `}
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #383a45;
  color: white;
  padding: 5px 5px 5px 5px;
  border-radius: 5px;
  position: absolute;
  top: 20px;
  z-index: 9999;

  div {
    cursor: pointer;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 12px;
    text-align: center;
    
    &:hover {
      background: gray;
      border-radius: 5px;
    }
    animation:  ${props => props.$isClosing ? dropdownHide : dropdownShow} 0.3s ease-in-out;
    transform-origin: top;
  }
`;
