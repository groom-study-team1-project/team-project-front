import React from "react";
import {
  Wrap,
  Main,
  LeftContent,
  MyInfoHeader,
  ProfileSetting,
  IntroDuce,
  UserInfoBox,
  RightContentWrap,
  RightContent,
} from "./MobailProfile.style";
import { BigProfileBox } from "../../../components/Card/PostCard/PostProfile";
import MyPostsItems from "../../../pages/MyPage/MyProfile/MyProfile";
import EditProfile from "../../../pages/MyPage/EditProfile/EditProfile";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faBlogger } from "@fortawesome/free-brands-svg-icons";

const MobailProfile = ({
  profileData,
  isMeData,
  setProfileState,
  profileState,
}) => {
  return (
    <>
      <Wrap>
        <Main>
          <LeftContent>
            <MyInfoHeader>
              <BigProfileBox
                nickName={profileData.nickname}
                job={profileData.job}
                src={profileData.imageUrl}
              />
              {isMeData && (
                <ProfileSetting
                  onClick={() => {
                    setProfileState("editProfile");
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="2xl" />
                  &nbsp;&nbsp;<span>유저 정보 변경</span>
                </ProfileSetting>
              )}
            </MyInfoHeader>
            <MyInfoHeader>
              <IntroDuce>
                {profileData.aboutMe === ""
                  ? "자기소개를 작성해주세요"
                  : profileData.aboutMe}
              </IntroDuce>
            </MyInfoHeader>
            <MyInfoHeader>
              <UserInfoBox>
                {profileData.githubUrl === "" ? (
                  "GitHub url을 추가하세요"
                ) : (
                  <a href={profileData.githubUrl} target="_blank">
                    <FontAwesomeIcon icon={faGithub} size="2xl" />
                    &nbsp;&nbsp;<span>Github</span>
                  </a>
                )}
              </UserInfoBox>
              <UserInfoBox>
                {profileData.blogUrl === "" ? (
                  "Blog url을 추가하세요"
                ) : (
                  <a href={profileData.blogUrl} target="_blank">
                    <FontAwesomeIcon icon={faBlogger} size="2xl" />
                    &nbsp;&nbsp;<span>Blog</span>
                  </a>
                )}
              </UserInfoBox>
            </MyInfoHeader>
          </LeftContent>
          <RightContentWrap>
            <RightContent>
              {profileState === "mypost" ? (
                <MyPostsItems postCount={profileData.postCount} />
              ) : (
                <EditProfile setProfileState={setProfileState} />
              )}
            </RightContent>
          </RightContentWrap>
        </Main>
      </Wrap>
    </>
  );
};

export default MobailProfile;
