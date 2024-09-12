import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  background-color: rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-radius: 40px;
`;

export const Logo = styled.div`
  margin-bottom: 4rem;

  h1 {
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Btn = styled.button`
  margin: 1rem 0;
  width: 404px;
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
  width: ${({ width }) => width || "100%"};
  height: 1px;
  background-color: #929292;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
`;
