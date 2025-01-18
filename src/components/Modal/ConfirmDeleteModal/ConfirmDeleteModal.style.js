import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 90%;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  padding: 40px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  color: #333;
`;

export const ModalDescription = styled.p`
  margin: 0 0 24px;
  font-size: 1rem;
  color: #666;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.confirm ? "#f44336" : "#e0e0e0")};
  color: ${(props) => (props.confirm ? "#fff" : "#333")};
  &:hover {
    background-color: ${(props) => (props.confirm ? "#d32f2f" : "#d6d6d6")};
  }
`;
