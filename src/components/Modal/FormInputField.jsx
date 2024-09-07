import styled from "styled-components";

const Input = styled.input`
  width: 400px;
  height: 36px;
  margin: 16px 0;
`;

export const FormInputField = ({ label, type, value }) => (
  <div>
    <p>{label}</p>
    <Input type={type} value={value} />
  </div>
);
