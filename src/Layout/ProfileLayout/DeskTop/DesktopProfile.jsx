import React from "react";
import {
  Wrap,
  Main,
  LeftContent,
  ProfileSetting,
  UserInfoBox,
  RightContentWrap,
  RightContent,
  IntroDuce,
} from "./DesktopProfile.style";
import { BigProfileBox } from "../../../components/Card/PostCard/PostProfile";
import MyPostsItems from "../../../pages/MyPage/MyProfile/DeskTop/MyProfile";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faBlogger } from "@fortawesome/free-brands-svg-icons";
import EditProfile from "../../../pages/MyPage/EditProfile/EditProfile";

const DesktopProfile = ({
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
            <BigProfileBox
              nickName={profileData.nickname}
              job={profileData.job}
              src={profileData.imageUrl}
            />
            <IntroDuce>
              {profileData.aboutMe === ""
                ? "자기소개를 작성해주세요"
                : profileData.aboutMe}
            </IntroDuce>
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
          </LeftContent>
          <RightContentWrap>
            <RightContent>
              {profileState === "mypost" ? (
                <MyPostsItems postCount={profileData.postCount} />
              ) : (
                <EditProfile
                  setProfileState={setProfileState}
                  isMeData={isMeData}
                />
              )}
            </RightContent>
          </RightContentWrap>
        </Main>
      </Wrap>
    </>
  );
};

export default DesktopProfile;
