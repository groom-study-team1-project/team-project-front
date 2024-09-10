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
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: darkgray;
`;
