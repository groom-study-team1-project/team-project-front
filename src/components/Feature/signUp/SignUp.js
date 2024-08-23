import React, { useState } from "react";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    // todo: 회원가입 로직
  };

  return (
    <div className="signUp">
      {/* SignUp */}
      <div className="signUpHeader">
        <h1>회원가입</h1>
      </div>
      <form action="" method="post" onSubmit={handleSignUp}>
        <div className="name">
          <p>닉네임</p>
          <input type="text" value={name} />
        </div>
        <div className="email">
          <p>이메일</p>
          <input type="email" value={email} />
        </div>
        <div className="password">
          <p>비밀번호</p>
          <input type="password" value={password} />
        </div>
        <div className="confirmPassword">
          <p>비밀번호 확인</p>
          <input type="password" value={confirmPassword} />
        </div>
        <div className="phoneNum">
          <p>휴대폰 번호</p>
          <input type="tel" value={phoneNum} />
        </div>
        <div className="createAuthBtn">
          <button type="submit">계정 생성하기</button>
        </div>
      </form>
    </div>
  );
}
