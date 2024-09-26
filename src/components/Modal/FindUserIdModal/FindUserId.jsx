import React, { useState } from "react";
import { Btn, Container, Divider, Form } from "../Modal.style";
import { FindUserIdHeader } from "./FindUserId.style";
import { FormInputField } from "../FormInputField";
import { findUserId } from "../../../services/authApi";

export default function FindUserId({ changeModal }) {
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");
  const [foundEmail, setFoundEmail] = useState(false);

  async function handleFindUserId(e) {
    e.preventDefault();

    try {
      const response = await findUserId(nickname, tel);
      console.log("응답 성공 여부", response.success);
      // if (response.data.success) {
      //   setFoundEmail(response.data.email);
      // } else console.log("email 찾을 수 없음");

      if (response && response.success && response.result.email) {
        setFoundEmail(response.result.email);
        console.log("이메일 찾기 성공", response.result.email);
      } else console.log("이메일 찾기 실패");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container width="530px" height="628px">
      {!foundEmail ? (
        <div>
          <FindUserIdHeader>
            <h1>아이디 찾기</h1>
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
              onChange={(e) => setTel(e.target.value)}
            />
            <Divider />
            <Btn type="submit">아이디 찾기</Btn>
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
            <span>이메일: </span>
            <span>{foundEmail}</span>
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
