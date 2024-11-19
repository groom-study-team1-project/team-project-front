import styled from "styled-components";

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 404px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #929292;
  background-color: white;
`;

export const FormInputField = ({
  label,
  type,
  value,
  onChange,
  onBlur,
  hasError,
}) => (
  <FormInputContainer>
    <p>{label}</p>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      hasError={hasError}
    />
  </FormInputContainer>
);
