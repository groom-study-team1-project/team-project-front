import React, { useState, useEffect } from "react";
import {
  BigProfileBox,
  ProfileImage,
} from "../../../components/Card/PostCard/PostProfile";
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
import { useSelector, useDispatch } from "react-redux";
import { editProfile, fetchProfileInfo } from "../../../services/api/authApi";
import { useNavigate } from "react-router-dom";
import useJwt from "../../../hooks/useJwt";

function EditProfile() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );
  const memberId = payload.memberId;

  const [profileData, setProfileData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    fetchProfileInfo(memberId)
      .then(({ data }) => {
        setProfileData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleEdit(e) {
    e.preventDefault();

    const body = {
      nickname: profileData.nickname,
      imageUrl: profileData.imageUrl,
      aboutMe: profileData.aboutMe,
      phoneNumber: profileData.phoneNumber,
      githubUrl: profileData.githubUrl,
      blogUrl: profileData.blogUrl,
    };

    try {
      const response = await editProfile(body);
      console.log(response);
      GoBack();
    } catch (error) {
      console.error("프로필 수정 실패", error);
    }
  }

  const GoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <form action="" method="post" onSubmit={handleEdit}>
        <EditProfileWrapper>
          <ProfileActionWrapper>
            <BigProfileBox
              nickName={profileData?.nickname}
              job={profileData?.role}
            />
            <div>
              <ProfileButton type="button" onClick={GoBack}>
                취소
              </ProfileButton>
              <ProfileButton type="submit">저장</ProfileButton>
            </div>
          </ProfileActionWrapper>

          <FlexDiv>
            <Label>닉네임</Label>
            <Input
              type="text"
              value={profileData?.nickname || ""}
              onChange={(e) =>
                setProfileData((prevData) => ({
                  ...prevData,
                  nickname: e.target.value,
                }))
              }
            />
          </FlexDiv>

          <FlexDiv>
            <Label>휴대폰 번호</Label>
            <Input
              type="tel"
              value={profileData?.phoneNumber || ""}
              onChange={(e) =>
                setProfileData((prevData) => ({
                  ...prevData,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </FlexDiv>

          <FlexDiv>
            <Label>프로필 사진</Label>
            <ProfileImageWrapper>
              <ProfileImage
                width="90px"
                height="90px"
                src={profileData?.imageUrl}
              />
              <div>
                <ProfileButton type="button">삭제</ProfileButton>
                <ProfileButton type="button">수정</ProfileButton>
              </div>
            </ProfileImageWrapper>
          </FlexDiv>

          <FlexDiv>
            <Label>내 정보</Label>
            <ProfileDetails>
              <JobSelect
                name="job"
                value={profileData?.role || ""}
                onChange={(e) =>
                  setProfileData((prevData) => ({
                    ...prevData,
                    role: e.target.value,
                  }))
                }
              >
                <option value="IOS Developer">IOS Developer</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="NORMAL, STUDENT, GRADUATE">
                  NORMAL, STUDENT, GRADUATE
                </option>
              </JobSelect>
              <SelfIntroductionTextarea
                name="aboutMe"
                value={profileData?.aboutMe || ""}
                onChange={(e) =>
                  setProfileData((prevData) => ({
                    ...prevData,
                    aboutMe: e.target.value,
                  }))
                }
              />
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
