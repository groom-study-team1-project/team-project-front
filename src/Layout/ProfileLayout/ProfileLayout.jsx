import React, { useEffect, useState } from "react";
import {
  Main,
  LeftContent,
  RightContent,
  RightContentWrap,
  ProfileSetting,
  Wrap,
  UserInfoBox,
} from "./ProfileLayout.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faBlogger } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { fetchProfileInfo } from "../../services/api/authApi";
import { useParams, Link } from "react-router-dom";
import { BigProfileBox } from "../../components/Card/PostCard/PostProfile";
import useJwt from "../../hooks/useUserInfo";
import MyPostsItems from "../../pages/MyPage/MyProfile/MyProfile";
import EditProfile from "../../pages/MyPage/EditProfile/EditProfile";
function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isMeData, setIsMe] = useState(false);
  const [profileState, setProfileState] = useState("mypost");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const { memberId } = useParams();
  const payload = useJwt(localStorage.getItem("accessToken"));
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const body = { isMe: payload?.userInfo?.id, memberId };
        const { isMe, data } = await fetchProfileInfo(body);
        console.log(data);
        if (data.status.code === 1002) {
          setIsMe(isMe);
          setProfileData(data.result);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [isLoggedIn, memberId, payload.userInfo, profileState]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <Wrap>
      <Main>
        <LeftContent>
          <BigProfileBox
            nickName={profileData.nickname}
            job={profileData.job}
            src={profileData.imageUrl}
          />
          <UserInfoBox>
            {profileData.aboutMe === ""
              ? "자기소개를 작성해주세요"
              : profileData.aboutMe}
          </UserInfoBox>
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
              프로필 수정
            </ProfileSetting>
          )}
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
  );
}

export default MyProfile;
