import React, { useState } from "react";
import { join } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { Btn, Container, Divider, Form, Logo } from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { FindUserBtn } from "./LoginModal.style";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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

  const handleFindUserId = () => {
    navigate("/find-user-id");
  };

  const handleFindUserPw = () => {
    navigate("/find-user-pw");
  };

  return (
    <Container width="530px" height="628px">
      <Logo>
        <h1>로고 이미지</h1>
      </Logo>
      <Form action="" method="post" onSubmit={handleLogin}>
        <FormInputField label={"이메일"} type={"email"} value={email} />
        <FormInputField label={"비밀번호"} type={"password"} value={password} />
        <div className="btns">
          <div
            className="findUserBtns"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <FindUserBtn onClick={handleFindUserId}>아이디 찾기</FindUserBtn>
            <FindUserBtn onClick={handleFindUserPw}>비밀번호 찾기</FindUserBtn>
          </div>
        </div>
        <Btn type="submit" id="loginBtn">
          로그인
        </Btn>
        <Divider />
        <Btn id="signUpBtn">회원가입</Btn>
      </Form>
    </Container>
  );
}
