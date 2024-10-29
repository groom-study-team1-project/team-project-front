import styled, { keyframes, css } from "styled-components";

const vibration = keyframes`
 0% {
    transform: rotate(1deg);
  }
  50% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(1deg);
  }
`;

export const ErrMsg = styled.div`
  font-size: 12px;
  color: red;

  ${({ isVibrating }) =>
    isVibrating &&
    css`
      animation: ${vibration} 0.1s ease 5;
    `}
`;
