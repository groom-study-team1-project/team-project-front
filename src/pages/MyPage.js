import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchMyprofileData } from "../services/api";
import {
  PostCollection,
  ProfileLeft,
} from "../components/Common/PostCollection";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Main = styled.div`
  width: 1450px;
  border: 1px solid black;
`;

const ProfileWrap = styled.div`
  width: 1450px;
  margin-left: 0px;
  margin-bottom: 70px;
`;

const ProfileTitle = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;

const ProfileSetting = styled.button`
  border-radius: 10px;
  width: 155px;
  height: 50px;
  background-color: #7682ff;
  color: white;
  border: none;
  cursor: pointer;
`;

const Userintroduce = styled.div`
  padding: 20px;
`;

function MyPage() {
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

export default MyPage;
