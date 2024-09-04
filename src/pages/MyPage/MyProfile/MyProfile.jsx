import React, { useEffect, useState } from "react";
import { fetchMyprofileData } from "../../../services/api";
import {
  Main,
  PostCollection,
  ProfileHeader,
  ProfileLeft,
  ProfileSetting,
  ProfileTitle,
  ProfileWrap,
  Userintroduce,
  Wrap,
} from "./MyProfile.style";
// Error > ProfileLeft, PostCollection 이 MyProfile.style.js에 존재하지 않음

function MyProfile() {
  const [myProfile, setProfile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const MyprofileData = await fetchMyprofileData();
        setProfile(MyprofileData.result);
      } catch (error) {
        console.error("데이터 가져오는데 실패", error);
      }
    };
    fetchData();
  }, []);

  if (!myProfile) {
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
              nickName={myProfile.userInfo.nickName}
              job={myProfile.userInfo.Job}
            />
            <ProfileSetting>프로필 수정</ProfileSetting>
          </ProfileHeader>
          <hr />
          <Userintroduce>{myProfile.userInfo.userIntroduce}</Userintroduce>
          <hr />
          <PostCollection myProfile={myProfile} />
        </Main>
      </Wrap>
    </>
  );
}

export default MyProfile;
