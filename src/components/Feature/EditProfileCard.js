import React, { useState } from "react";
import { ProfileImage } from "../Common/PostCardComponents";
import { Form, FormInputField } from "../Common/AuthCommonComponents";
import styled from "styled-components";

const Btn = styled.button``;

function EditProfileCard() {
  const [nickname, setNickname] = useState("");
  const [job, setJob] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
  const [email, setEmail] = useState("");

  async function handleEdit(e) {
    e.preventDefault();
  }

  return (
    <>
      <ProfileImage />
      <Form action="" method="post" onSubmit={handleEdit}>
        <FormInputField label={"닉네임"} type={"text"} value={nickname} />
        <FormInputField label={"직업"} type={"text"} value={job} />
        <FormInputField label={"자기소개"} type={"text"} value={selfIntro} />
        <FormInputField label={"이메일"} type={"email"} value={email} />

        <Btn type="submit">수정</Btn>
        <Btn>취소</Btn>
      </Form>
    </>
  );
}

export default EditProfileCard;
