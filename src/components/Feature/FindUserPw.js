import React, { useState } from "react";
import styled from "styled-components";
import { findUserPw } from "../../services/api";
import {
  Container,
  Logo,
  Form,
  FormInputField,
  Divider,
  Btn,
} from "../Common/AuthCommonComponents";

const FindUserPwHeader = styled(Logo)``;

export default function FindUserPw() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const handleFindUserPw = async () => {
    try {
      const response = await findUserPw(email, name, phoneNum);

      // todo: 비밀번호 처리 방안 검토 후 함수 구현
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container width="530px" height="628px">
      <div>
        <FindUserPwHeader>
          <h2>비밀번호 찾기</h2>
        </FindUserPwHeader>
        <Form action="">
          <FormInputField label={"이메일"} type={"email"} value={email} />
          <FormInputField label={"닉네임"} type={"text"} value={name} />
          <FormInputField label={"휴대폰 번호"} type={"tel"} value={phoneNum} />
          <Divider />
          <Btn onClick={handleFindUserPw} type="submit">
            비밀번호 찾기
          </Btn>
        </Form>
      </div>
    </Container>
  );
}
