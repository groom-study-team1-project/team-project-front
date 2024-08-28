import React, { useState } from "react";
import { findUserId } from "../../services/api";
import styled from "styled-components";
import {
  ContainerDiv,
  Logo,
  Form,
  Input,
  Btn,
} from "../../assets/styles/AuthCommonStyles";

const FindUserIdDiv = styled.div`
  height: 628px;
  width: 530px;
  margin: auto;
  margin-top: 10rem;
  padding-top: 10rem;
  box-sizing: border-box;
`;

export default function FindUserId() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState(null);

  const handleFindUserId = async () => {
    try {
      const response = await findUserId(name, phoneNum);
      setEmail(response.email);
      console.log("success", response.email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerDiv>
      {/* FindUserId */}
      <FindUserIdDiv>
        <Logo>
          <h2>아이디 찾기</h2>
        </Logo>
        <Form action="">
          <div>
            <p>닉네임</p>
            <Input type="text" value={name} />
          </div>
          <div style={{ borderBottom: "1px solid darkgray" }}>
            <p>휴대폰 번호</p>
            <Input type="text" value={phoneNum} marginBtm="1rem" />
          </div>
          <div>
            <Btn onClick={handleFindUserId}>아이디 찾기</Btn>
          </div>
        </Form>
      </FindUserIdDiv>
    </ContainerDiv>
  );
}
