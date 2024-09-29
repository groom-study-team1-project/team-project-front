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

    if (password.length < 8 || password.length > 16) {
      errors.password = "비밀번호는 8글자 이상 16글자 이하이어야 합니다.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleChangeUserPw(e) {
    e.preventDefault();

    try {
      const isValid = validateForm();

      if (isValid) {
        let body = { email, password };
        const response = await changeUserPw(body);

        console.log("응답 성공 여부", response.success);

        changeModal("login");
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
          {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
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
