import React, { useState } from "react";
import { join } from "../../services/api";
import styled from "styled-components";
import {
  ContainerDiv,
  Logo,
  Form,
  Input,
  Btn,
} from "../Common/AuthCommonComponents";

const LoginDiv = styled.div`
  height: 628px;
  width: 530px;
  margin: 8rem 0;
  padding: 8rem 0;
  box-sizing: border-box;
`;

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
    <ContainerDiv>
      <LoginDiv>
        {/* Login */}
        <Logo>
          <h1>로고 이미지</h1>
        </Logo>
        <Form action="" method="post" onSubmit={handleLogin}>
          <div className="email">
            <p>이메일</p>
            <Input type="email" value={email} />
          </div>
          <div className="password">
            <p>비밀번호</p>
            <Input type="password" value={password} marginBtm="1rem" />
          </div>
          <div className="btns">
            <div style={{ borderBottom: "1px solid darkgray" }}>
              <Btn type="submit" id="loginBtn">
                로그인
              </Btn>
            </div>
            <div>
              <Btn id="signUpBtn">회원가입</Btn>
            </div>
          </div>
        </Form>
      </LoginDiv>
    </ContainerDiv>
  );
}
