import React, { useState, useEffect } from "react";
import {
  EditProfileBox,
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
import { editProfile } from "../../../services/authApi";
import { updateUserInfo } from "../../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const [profileImg, setProfileImg] = useState(null);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");
  const [job, setJob] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
      setEmail(userInfo.email || "");
      setTel(userInfo.phoneNumber || "");
      setJob(userInfo.role);
      setAboutMe(userInfo.aboutMe);
    }
  }, [userInfo]);

  async function handleEdit(e) {
    e.preventDefault();

    const body = {
      profileImg,
      nickname,
      email,
      tel,
      job,
      aboutMe,
    };

    try {
      const response = await editProfile(body);

      if (response.code === 1007) {
        const {
          nickname,
          imageUrl,
          aboutMe,
          tel,
          role,
          githubUrl,
          blogUrl,
          activityStats,
        } = response.result;

        const updatedProfile = {
          nickname,
          email,
          role,
          imageUrl,
          aboutMe,
          phoneNumber: tel,
        };

        dispatch(updateUserInfo(updatedProfile));

        GoBack();
      } else {
        console.error("프로필 수정 실패:", response.message);
      }
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
            <EditProfileBox name={nickname} job={job} />
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
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </FlexDiv>

          <FlexDiv>
            <Label>이메일</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </FlexDiv>

          <FlexDiv>
            <Label>휴대폰 번호</Label>
            <Input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </FlexDiv>

          <FlexDiv>
            <Label>프로필 사진</Label>
            <ProfileImageWrapper>
              <ProfileImage
                width="90px"
                height="90px"
                src={userInfo.imageUrl}
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
                value={job}
                onChange={(e) => setJob(e.target.value)}
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
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
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
