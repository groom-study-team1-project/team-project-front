import React, { useEffect, useState } from "react";
import {
  Main,
  ProfileHeader,
  ProfileSetting,
  ProfileTitle,
  ProfileWrap,
  Userintroduce,
  Wrap,
} from "./MyProfile.style";
import {
  PostCollection,
  ProfileLeft,
} from "../../../components/Common/PostCollection";
import { useSelector } from "react-redux";
import { fetchProfileInfo } from "../../../services/authApi";

function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const email = useSelector((state) => state.user.userInfo);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    if (email) {
      const memberId = email.split("@")[0];

      fetchProfileInfo(memberId)
        .then((data) => setProfileData(data))
        .catch((err) => setError(err));
    }
  }, [email]);

  if (!isLoggedIn) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (error) {
    return <div>프로필 정보를 불러오는데 실패했습니다.</div>;
  }

  if (!profileData && isLoggedIn) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Wrap>
        <ProfileWrap>
          <ProfileTitle>프로필</ProfileTitle>
        </ProfileWrap>
        <Main>
          <ProfileHeader>
            <ProfileLeft
              nickName={profileData.result.nickname}
              job={profileData.result.role}
            />
            <ProfileSetting>프로필 수정</ProfileSetting>
          </ProfileHeader>
          <hr />
          <Userintroduce>{profileData.result.aboutMe}</Userintroduce>
          <hr />
          {/* <PostCollection myProfile={profileData} /> */}
        </Main>
      </Wrap>
    </>
  );
}

export default MyProfile;
