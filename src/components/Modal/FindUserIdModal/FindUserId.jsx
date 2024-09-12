import React, { useState } from "react";
import { Btn, Container, Divider, Form } from "../Modal.style";
import { FindUserIdHeader } from "./FindUserId.style";
import { FormInputField } from "../FormInputField";
import { findUserId } from "../../../services/authApi";

const mockUserData = {
  nickname: "구름이",
  phoneNumber: "010-1234-5678",
  email: "example@example.com",
};

export default function FindUserId({ changeModal }) {
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [foundEmail, setFoundEmail] = useState(false);

  async function handleFindUserId(e) {
    e.preventDefault();

    try {
      // const response = await findUserId(nickname, tel);
      // console.log("success", response.result.email);
      // if (response.data.success) {
      //   setEmail(response.data.email);
      //   setFoundEmail(true);
      // } else console.log("email 찾을 수 없음");

      if (
        nickname === mockUserData.nickname &&
        tel === mockUserData.phoneNumber
      ) {
        setFoundEmail(mockUserData.email);
        console.log("success", mockUserData.email);
      } else console.log("사용자 정보 찾을 수 없음");

      // changeModal("login");
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
