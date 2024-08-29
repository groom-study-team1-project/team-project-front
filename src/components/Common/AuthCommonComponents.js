import styled from "styled-components";

export const ContainerDiv = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Logo = styled.div`
  text-align: left;
  margin-left: 4rem;
  margin-bottom: 4rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 400px;
  height: 36px;
  margin: 16px 0;
  margin-bottom: ${(props) => props.marginBtm};
`;

export const Btn = styled.button`
  margin: 1rem 0;
  width: 404px;
  height: 40px;
  cursor: pointer;
`;
