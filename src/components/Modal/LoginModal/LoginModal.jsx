import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn, Container, Divider, Form, Logo } from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { FindUserBtn } from "./LoginModal.style";
import { login } from "../../../services/authApi";

export default function LoginModal({ closeModal, changeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      let body = { email, password };

      const response = await login(body);
      console.log(response);

      const { accessToken, refreshToken } = response.result;

      localStorage.setItem("accessToken", accessToken);

      closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  const handleFindUserId = () => {
    changeModal("findUserId");
  };

  const handleFindUserPw = () => {
    changeModal("findUserPw");
  };

  return (
    <Container width="530px" height="628px">
      <Logo>
        <h1>로고 이미지</h1>
      </Logo>
      <Form action="" method="post" onSubmit={handleLogin}>
        <FormInputField
          label={"이메일"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInputField
          label={"비밀번호"}
          type={"password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e.target.value);
          }}
        />

        <Btn type="submit" id="loginBtn">
          로그인
        </Btn>
        <Divider />

        <div className="btns">
          <div
            className="findUserBtns"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <FindUserBtn onClick={handleFindUserId}>아이디 찾기</FindUserBtn>
            <FindUserBtn onClick={handleFindUserPw}>비밀번호 찾기</FindUserBtn>
          </div>
        </div>
      </Form>
    </Container>
  );
}
