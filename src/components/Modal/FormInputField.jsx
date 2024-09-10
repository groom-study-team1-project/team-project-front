import styled from "styled-components";

const Input = styled.input`
  width: 404px;
  height: 36px;
  margin: 16px 0;
  margin-bottom: 32px;
  border-radius: 10px;
  border: 1px solid #929292;
  background-color: white;
`;

export const FormInputField = ({ label, type, value, onChange }) => (
  <div>
    <p>{label}</p>
    <Input type={type} value={value} onChange={onChange} />
  </div>
);
