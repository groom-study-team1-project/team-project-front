import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { join } from "../../services/api";
import styled from "styled-components";

const LoginDiv = styled.div`
  height: 628px;
  width: 530px;
  margin: auto;
  margin-top: 8rem;
  padding-top: 10rem;
  box-sizing: border-box;
`;

const ContainerDiv = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Logo = styled.div`
  text-align: left;
  margin-left: 4rem;
  margin-bottom: 4rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 400px;
  height: 36px;
  margin-bottom: ${(props) => props.marginBtm};
`;

const Btn = styled.button`
  margin: 1rem 0;
  width: 404px;
  height: 40px;
  cursor: pointer;
`;

const FindUserBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

export default function Login() {
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
            <div
              className="findUserBtns"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <FindUserBtn onClick={handleFindUserId}>아이디 찾기</FindUserBtn>
              <FindUserBtn onClick={handleFindUserPw}>
                비밀번호 찾기
              </FindUserBtn>
            </div>
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
