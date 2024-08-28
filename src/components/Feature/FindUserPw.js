import React, { useState } from "react";
import styled from "styled-components";
import { findUserPw } from "../../services/api";
import {
  ContainerDiv,
  Logo,
  Form,
  Input,
  Btn,
} from "../../assets/styles/AuthCommonStyles";

const FindUserPwDiv = styled.div`
  height: 628px;
  width: 530px;
  margin: auto;
  margin-top: 8rem;
  padding-top: 10rem;
  box-sizing: border-box;
`;

export default function FindUserPw() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const handleFindUserPw = async () => {
    try {
      const response = await findUserPw(email);

      // todo: 비밀번호 처리 방안 검토 후 함수 구현
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerDiv>
      {/* FindUserPw */}
      <FindUserPwDiv>
        <Logo>
          <h2>비밀번호 찾기</h2>
        </Logo>
        <Form action="">
          <div>
            <p>이메일</p>
            <Input type="email" value={email} />
          </div>
          <div>
            <p>닉네임</p>
            <Input type="text" value={name} />
          </div>
          <div style={{ borderBottom: "1px solid darkgray" }}>
            <p>휴대폰 번호</p>
            <Input type="tel" value={phoneNum} marginBtm="1rem" />
          </div>
          <div>
            <Btn onClick={handleFindUserPw}>비밀번호 찾기</Btn>
          </div>
        </Form>
      </FindUserPwDiv>
    </ContainerDiv>
  );
}
