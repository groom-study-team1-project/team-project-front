import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 400px;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const ModalInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #5b9bd5;
    color: #fff;
  }
  ${(props) => props.$err && `margin-top: 10px;`}
  button.cancel {
    background-color: #ccc;
    color: black;
  }
`;
