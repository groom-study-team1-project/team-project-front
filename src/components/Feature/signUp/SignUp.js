import React, { useState } from "react";
import styles from "./SignUp.module.css";
import profileIcon from "../../../assets/images/profileIcon.png";
import { signup } from "../../../services/api";

export default function SignUp() {
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
    <div>
      <div>
        <h1>회원가입</h1>
      </div>
      <form onSubmit={handleSignUp}>
        <div>
          <img src={profileImg ? profileImg : profileIcon} alt="프로필사진" />
          <div>
            <input type="file" onChange={handleImageChange} />
          </div>
        </div>
        <div>
          <p>닉네임</p>
          <input type="text" value={name} />
        </div>
        <div>
          <p>이메일</p>
          <input type="email" value={email} />
        </div>
        <div>
          <p>비밀번호</p>
          <input type="password" value={password} />
        </div>
        <div>
          <p>비밀번호 확인</p>
          <input type="password" value={confirmPassword} />
        </div>
        <div>
          <p>휴대폰 번호</p>
          <input type="tel" value={phoneNum} />
        </div>
        <div>
          <button type="submit">계정 생성하기</button>
        </div>
      </form>
    </div>
  );
}
