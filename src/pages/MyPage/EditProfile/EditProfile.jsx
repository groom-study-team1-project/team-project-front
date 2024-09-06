import React, { useState } from "react";
import { ProfileImage } from "../../../components/Card/PostCard/PostProfile";
import { edit } from "../../../services/api";
import {
  EditProfileWrapper,
  FlexDiv,
  Input,
  JobSelect,
  Label,
  PasswordButton,
  ProfileActionWrapper,
  ProfileButton,
  ProfileDetails,
  ProfileImageWrapper,
  SelfIntroductionTextarea,
} from "./EditProfile.style";

function EditProfile() {
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
      <PasswordButton>비밀번호 변경</PasswordButton>
    </>
  );
}

export default EditProfile;