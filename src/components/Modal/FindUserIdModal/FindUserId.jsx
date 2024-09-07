import React, { useState } from "react";
import { Btn, Container, Divider, Form } from "../Modal.style";
import { FindUserIdHeader } from "./FindUserId.style";
import { FormInputField } from "../FormInputField";
import { findUserId } from "../../../services/authApi";

export default function FindUserId() {
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");

  const handleFindUserId = async () => {
    try {
      const response = await findUserId(nickname, tel);

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
        <Form onSubmit={handleFindUserId}>
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <Divider />
          <Btn onClick={handleFindUserId} type="submit">
            아이디 찾기
          </Btn>
        </Form>
      </div>
    </Container>
  );
}
