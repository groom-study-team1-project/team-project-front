import styled from "styled-components";

export const PinInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const PinInput = styled.input`
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
