import React, { useState } from "react";
import { Btn, Container, Divider, Form } from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { FindUserPwHeader } from "./FindUserPw.style";
import { findUserPw } from "../../../services/api/authApi";

export default function FindUserPw({ changeModal }) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");
  const [foundPw, setFoundPw] = useState(false);

  async function handleFindUserPw(e) {
    e.preventDefault();

    try {
      const response = await findUserPw(email, nickname, tel);

      console.log("응답 성공 여부", response.success);

      if (response && response.success && response.result.password) {
        setFoundPw(response.result.password);
        console.log(response.message);
      } else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container width="530px" height="628px">
      {!foundPw ? (
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
      ) : (
        <div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              fontSize: "20px",
            }}
          >
            <span>비밀번호: </span>
            <span>{foundPw}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Btn
              onClick={() => changeModal("login")}
              style={{
                width: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              로그인 화면으로 돌아가기
            </Btn>
          </div>
        </div>
      )}
    </Container>
  );
}
