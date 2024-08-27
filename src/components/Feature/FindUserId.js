import React, { useState } from "react";
import { findUserId } from "../../services/api";
import styled from "styled-components";

const ContainerDiv = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const FindUserIdDiv = styled.div`
  height: 628px;
  width: 530px;
  margin: auto;
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
      <FindUserId>
        <div>
          <h2>아이디 찾기</h2>
        </div>
        <form action="">
          <div>
            <p>닉네임</p>
            <input type="text" value={name} />
          </div>
          <div>
            <p>휴대폰 번호</p>
            <input type="text" value={phoneNum} />
          </div>
          <div>
            <button type="submit">아이디 찾기</button>
          </div>
        </form>
      </FindUserId>
    </ContainerDiv>
  );
}
