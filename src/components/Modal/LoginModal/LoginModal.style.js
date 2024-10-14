import styled, { keyframes, css } from "styled-components";

export const FindUserBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  font-size: 14px;
`;

export const FindUserBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
  color: #42469c;
`;

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
