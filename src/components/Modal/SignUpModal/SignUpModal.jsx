import React, { useState } from "react";
import profileIcon from "../../../assets/images/profileIcon.png";
import { Btn, Container, Divider, Form } from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { ProfileImgDiv, SignUpHeader } from "./SignUpModal.style";
import { signUp } from "../../../services/authApi";
import { uploadImageToS3 } from "../../../services/s3Service";

export default function SignUpModal({ closeModal }) {
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tel, setTel] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const profileImgUrl = await uploadImageToS3(profileImg);

      let body = { email, password, nickname, imageUrl: profileImgUrl, tel };

      const response = await signUp(body);
      console.log(response);

      closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
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
          <FormInputField
            label={"닉네임"}
            type={"text"}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <FormInputField
            label={"이메일"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInputField
            label={"비밀번호"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInputField
            label={"비밀번호 확인"}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormInputField
            label={"휴대폰 번호"}
            type={"tel"}
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <Divider />
          <Btn type="submit">계정 생성하기</Btn>
        </Form>
      </div>
    </Container>
  );
}
