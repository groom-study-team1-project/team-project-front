import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  background-color: rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-radius: 40px;
  padding: 56px 64px;
`;

export const ModalTitle = styled.div`
  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  img {
    width: 288px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`;

export const Btn = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  height: 40px;
  cursor: pointer;
  background-image: linear-gradient(90deg, #acb6e5 0%, #86fde8 100%);
  border: none;
  border-radius: 10px;
  font-size: 14px;
  transition: 0.3s;

  &:active {
    transform: scale(0.98);
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.2)
  );
`;
