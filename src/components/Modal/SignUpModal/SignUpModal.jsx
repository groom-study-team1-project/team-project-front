import React, { useState } from "react";
import profileIcon from "../../assets/images/profileIcon.png";
import { signup } from "../../../services/api";
import { Btn, Container, Divider, Form } from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { ProfileImgDiv, SignUpHeader } from "./SignUpModal.style";

export default function SignUpModal() {
  const [profileImg, setProfileImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const data = await signup(
        profileImg,
        name,
        email,
        password,
        confirmPassword,
        phoneNum
      );
      console.log("success", data);

      // todo: 회원가입 로직
    } catch (error) {
      console.log("failed", error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  return (
    <Container width="530px" height="918px">
      <div>
        <SignUpHeader>
          <h1>회원가입</h1>
        </SignUpHeader>
        <Form onSubmit={handleSignUp}>
          <ProfileImgDiv>
            <img
              src={profileImg ? profileImg : profileIcon}
              alt="프로필사진"
              style={{ width: "100px", height: "100px" }}
            />
            <div>
              <input type="file" onChange={handleImageChange} />
            </div>
          </ProfileImgDiv>
          <FormInputField label={"닉네임"} type={"text"} value={name} />
          <FormInputField label={"이메일"} type={"email"} value={email} />
          <FormInputField
            label={"비밀번호"}
            type={"password"}
            value={password}
          />
          <FormInputField
            label={"비밀번호 확인"}
            type={"password"}
            value={confirmPassword}
          />
          <FormInputField label={"휴대폰 번호"} type={"tel"} value={phoneNum} />
          <Divider />
          <Btn type="submit">계정 생성하기</Btn>
        </Form>
      </div>
    </Container>
  );
}
