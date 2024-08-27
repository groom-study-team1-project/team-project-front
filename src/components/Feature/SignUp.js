import React, { useState } from 'react';
import profileIcon from '../../assets/images/profileIcon.png';
import { signup } from '../../services/api';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const SignUpDiv = styled.div`
  height: 918px;
  width: 530px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: auto;
  padding-top: 5rem;
  box-sizing: border-box;
`;
const Logo = styled.div`
  text-align: left;
  margin-left: 4rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileImgDiv = styled.div`
  text-align: center;
`;
const Input = styled.input`
  width: 400px;
  height: 36px;
`;
const Btn = styled.button`
  margin: 1rem 0;
  width: 404px;
  height: 40px;
  cursor: pointer;
`;

export default function SignUp() {
  const [profileImg, setProfileImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

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
      console.log('success', data);

      // todo: 회원가입 로직
    } catch (error) {
      console.log('failed', error);
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
    <ContainerDiv>
      <SignUpDiv>
        <Logo>
          <h1>회원가입</h1>
        </Logo>
        <Form onSubmit={handleSignUp}>
          <ProfileImgDiv>
            <img src={profileImg ? profileImg : profileIcon} alt="프로필사진" />
            <div>
              <input type="file" onChange={handleImageChange} />
            </div>
          </ProfileImgDiv>
          <div>
            <p>닉네임</p>
            <Input type="text" value={name} />
          </div>
          <div>
            <p>이메일</p>
            <Input type="email" value={email} />
          </div>
          <div>
            <p>비밀번호</p>
            <Input type="password" value={password} />
          </div>
          <div>
            <p>비밀번호 확인</p>
            <Input type="password" value={confirmPassword} />
          </div>
          <div>
            <p>휴대폰 번호</p>
            <Input type="tel" value={phoneNum} />
          </div>
          <div style={{ borderTop: '1px solid darkgray', marginTop: '16px' }}>
            <Btn type="submit">계정 생성하기</Btn>
          </div>
        </Form>
      </SignUpDiv>
    </ContainerDiv>
  );
}
