import React, { useState } from "react";
import styled from "styled-components";
import { EditProfile, ProfileImage } from "../Common/PostCardComponents";
import { edit } from "../../services/api";

const EditProfileWrapper = styled.div`
  width: 1450px;
  border: 1px solid;
  padding: 40px;
`;

const ProfileActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const FlexDiv = styled.div`
  display: flex;
  border-bottom: 1px solid;
  padding: 20px 0;
`;

const Label = styled.p`
  width: 400px;
`;

const Input = styled.input`
  width: 500px;
  height: 36px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;

const ProfileButton = styled.button`
  width: 70px;
  height: 35px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

const JobSelect = styled.select`
  width: 250px;
  height: 36px;
  margin-bottom: 10px;
`;

const SelfIntroductionTextarea = styled.textarea`
  width: 500px;
  height: 108px;
  margin-bottom: 10px;
`;

function EditProfileCard() {
  const [profileImg, setProfileImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  async function handleEdit(e) {
    e.preventDefault();

    try {
      const data = await edit(profileImg, name, email, phoneNum);
      console.log("success", data);
    } catch (error) {
      console.log("failed", error);
    }
  }

  return (
    <>
      <form action="" method="post" onSubmit={handleEdit}>
        <EditProfileWrapper>
          <ProfileActionWrapper>
            <EditProfile name={"dd"} job={"ss"} />
            <div>
              <ProfileButton type="button">취소</ProfileButton>
              <ProfileButton type="submit">저장</ProfileButton>
            </div>
          </ProfileActionWrapper>
          <FlexDiv>
            <Label>닉네임</Label>
            <Input name="nickname" />
          </FlexDiv>
          <FlexDiv>
            <Label>이메일</Label>
            <Input name="email" />
          </FlexDiv>
          <FlexDiv>
            <Label>휴대폰 번호</Label>
            <Input name="phone" />
          </FlexDiv>
          <FlexDiv>
            <Label>프로필 사진</Label>
            <ProfileImageWrapper>
              <ProfileImage width="90px" height="90px" />
              <div>
                <ProfileButton type="button">삭제</ProfileButton>
                <ProfileButton type="button">수정</ProfileButton>
              </div>
            </ProfileImageWrapper>
          </FlexDiv>
          <FlexDiv>
            <Label>내 정보</Label>
            <ProfileDetails>
              <JobSelect name="job" />
              <SelfIntroductionTextarea name="selfIntro" />
              <p>400자 제한</p>
            </ProfileDetails>
          </FlexDiv>
        </EditProfileWrapper>
      </form>
    </>
  );
}

export default EditProfileCard;
