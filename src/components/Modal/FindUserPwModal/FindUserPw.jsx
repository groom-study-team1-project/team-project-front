import React, { useState } from "react";
import { Btn, Container, Divider, Form } from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { FindUserPwHeader } from "./FindUserPw.style";
import { findUserPw } from "../../../services/authApi";

export default function FindUserPw() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");

  async function handleFindUserPw(e) {
    e.preventDefault();

    try {
      const response = await findUserPw(email, nickname, tel);

      console.log("success", response.result.password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container width="530px" height="628px">
      <div>
        <FindUserPwHeader>
          <h2>비밀번호 찾기</h2>
        </FindUserPwHeader>
        <Form onSubmit={handleFindUserPw}>
          <FormInputField
            label={"이메일"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInputField
            label={"닉네임"}
            type={"text"}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <FormInputField
            label={"휴대폰 번호"}
            type={"tel"}
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <Divider />
          <Btn type="submit">비밀번호 찾기</Btn>
        </Form>
      </div>
    </Container>
  );
}
