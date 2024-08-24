import React, { useState } from "react";
import { join } from "../../../services/api";
import styled from "styled-components";

const LoginDiv = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  width: 400px;
  height: 36px;
  margin-bottom: ${(props) => props.marginBtm};
`;
const Btns = styled.div`
  text-align: center;
`;
const Btn = styled.button`
  margin: 1rem 0;
  width: 404px;
  height: 40px;
  cursor: pointer;
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
    <LoginDiv>
      {/* Login */}
      <div className="logo">
        <h1>로고 이미지</h1>
      </div>
      <form action="" method="post" onSubmit={handleLogin}>
        <div className="email">
          <p>이메일</p>
          <Input type="email" value={email} />
        </div>
        <div className="password">
          <p>비밀번호</p>
          <Input type="password" value={password} marginBtm="1rem" />
        </div>
        <Btns>
          <div className="loginBtn">
            <Btn type="submit">로그인</Btn>
          </div>
          <div className="signUpBtn">
            <Btn>회원가입</Btn>
          </div>
        </Btns>
      </form>
    </LoginDiv>
  );
}
