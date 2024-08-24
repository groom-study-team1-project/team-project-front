import React, { useState } from "react";
import { join } from "../../../services/api";

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
    <div className="login">
      {/* Login */}
      <div className="logo">
        <h1>로고 이미지</h1>
      </div>
      <form action="" method="post" onSubmit={handleLogin}>
        <div className="email">
          <p>이메일</p>
          <input type="email" value={email} />
        </div>
        <div className="password">
          <p>비밀번호</p>
          <input type="password" value={password} />
        </div>
        <div className="btns">
          <div className="loginBtn">
            <button type="submit">로그인</button>
          </div>
          <div className="signUpBtn">
            <button>회원가입</button>
          </div>
        </div>
      </form>
    </div>
  );
}
