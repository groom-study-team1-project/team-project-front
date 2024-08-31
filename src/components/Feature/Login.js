import React, { useState } from "react";
import { join } from "../../services/api";
import {
  Container,
  Logo,
  Form,
  Btn,
  FormInputField,
  Divider,
} from "../Common/AuthCommonComponents";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await join(email, password);
      console.log("success", data);
    } catch (error) {
      console.log("failed", error);
    }

    // todo: 로그인 로직
  }

  return (
    <Container width="530px" height="628px">
      <Logo>
        <h1>로고 이미지</h1>
      </Logo>
      <Form action="" method="post" onSubmit={handleLogin}>
        <FormInputField label={"이메일"} type={"email"} value={email} />
        <FormInputField label={"비밀번호"} type={"password"} value={password} />
        <Btn type="submit" id="loginBtn">
          로그인
        </Btn>
        <Divider />
        <Btn id="signUpBtn">회원가입</Btn>
      </Form>
    </Container>
  );
}
