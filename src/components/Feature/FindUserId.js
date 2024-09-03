import React, { useState } from "react";
import { findUserId } from "../../services/api";
import styled from "styled-components";
import {
  Container,
  Logo,
  Form,
  FormInputField,
  Divider,
  Btn,
} from "../Common/AuthCommonComponents";

const FindUserIdHeader = styled(Logo)``;

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
    <Container width="530px" height="628px">
      <div>
        <FindUserIdHeader>
          <h2>아이디 찾기</h2>
        </FindUserIdHeader>
        <Form action="">
          <FormInputField label={"닉네임"} type={"text"} value={name} />
          <FormInputField label={"휴대폰 번호"} type={"tel"} value={phoneNum} />
          <Divider />
          <Btn onClick={handleFindUserId} type="submit">
            아이디 찾기
          </Btn>
        </Form>
      </div>
    </Container>
  );
}
