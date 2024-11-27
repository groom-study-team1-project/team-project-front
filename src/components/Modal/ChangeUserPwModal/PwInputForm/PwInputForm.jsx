import React, { useState } from "react";
import { ErrorMsg } from "../../SignUpModal/SignUpModal.style";
import {
  Btn,
  BtnBox,
  Container,
  Divider,
  Form,
  ModalTitle,
} from "../../Modal.style";
import { FormInputField } from "../../FormInputField";
import { changeUserPw } from "../../../../services/api/authApi";

export default function PwInputForm({ email, handlePrev, changeModal }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (password !== confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      setErrors(errors);
      return false;
    }
    return true;
  };

  async function handleChangeUserPw(e) {
    e.preventDefault();

    try {
      const isValid = validateForm();

      if (isValid) {
        let body = { email, password };
        const response = await changeUserPw(body);
        console.log(response);
        if (response?.status?.code === 1008) {
          changeModal("login");
        } else {
          setErrors({ apiError: response?.message });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <ModalTitle>
        <h1>비밀번호 변경</h1>
      </ModalTitle>
      <Form onSubmit={(e) => handleChangeUserPw(e)}>
        <div>
          <FormInputField
            label={"비밀번호"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <FormInputField
            label={"비밀번호 확인"}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <ErrorMsg>{errors.confirmPassword}</ErrorMsg>
          )}
          {errors.apiError && <ErrorMsg>{errors.apiError}</ErrorMsg>}
        </div>
        <Divider />
        <BtnBox>
          <Btn onClick={handlePrev}>이전</Btn>
          <Btn type="submit">비밀번호 찾기</Btn>
        </BtnBox>
      </Form>
    </Container>
  );
}
