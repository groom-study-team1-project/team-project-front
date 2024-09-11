import React, { useEffect, useState } from "react";
import profileIcon from "../../assets/images/profileIcon.png";
import { signup } from "../../../services/api";
import { Btn, Container, Divider, Form } from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { ProfileImgDiv, SignUpHeader } from "./SignUpModal.style";
import {
  checkDuplicatedEmail,
  checkDuplicatedNickname,
} from "../../../services/authApi";

export default function SignUpModal() {
  const [profileImg, setProfileImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [isNameValid, setIsNameValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);

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

  useEffect(() => {
    const handleCheckNickname = async (e) => {
      if (name.length > 0) {
        try {
          const isValid = await checkDuplicatedNickname(name);
          setIsNameValid(isValid);
        } catch (error) {
          console.log("checking nickname error", error);
          setIsNameValid(false);
        }
      }
    };
    handleCheckNickname();
  }, [name]);

  useEffect(() => {
    const handleCheckEmail = async (e) => {
      if (email.length > 0) {
        try {
          const isValid = await checkDuplicatedEmail(email);
          setIsEmailValid(isValid);
        } catch (error) {
          console.log("checking email error", error);
          setIsEmailValid(false);
        }
      }
    };
    handleCheckEmail();
  }, [email]);

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
          <FormInputField
            label={"닉네임"}
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {isNameValid === false && (
            <p style={{ color: "red" }}>이미 사용 중인 닉네임입니다.</p>
          )}
          <FormInputField
            label={"이메일"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {isEmailValid === false && (
            <p style={{ color: "red" }}>이미 사용 중인 이메일입니다.</p>
          )}
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
          <FormInputField
            label={"휴대폰 번호"}
            type={"tel"}
            value={phoneNum}
            required
          />
          <Divider />
          <Btn type="submit">계정 생성하기</Btn>
        </Form>
      </div>
    </Container>
  );
}
