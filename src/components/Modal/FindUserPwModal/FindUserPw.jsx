import React, { useState } from "react";
import {
  ModalTitle,
  Btn,
  Container,
  Divider,
  Form,
  BtnBox,
} from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { findUserPw } from "../../../services/api/authApi";

export default function FindUserPw({ changeModal }) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");
  const [foundPw, setFoundPw] = useState(false);

  async function handleFindUserPw(e) {
    e.preventDefault();

    try {
      const response = await findUserPw(email, nickname, tel);

      console.log("응답 성공 여부", response.success);

      if (response && response.success && response.result.password) {
        setFoundPw(response.result.password);
        console.log(response.message);
      } else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <ModalTitle>
        <h2>비밀번호 변경</h2>
      </ModalTitle>
      <Form onSubmit={handleFindUserPw}>
        <div>
          <FormInputField
            label={"비밀번호"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={errors.password}
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
          <Btn type="submit">비밀번호 찾기</Btn>
        </BtnBox>
      </Form>
    </Container>
  );
}
