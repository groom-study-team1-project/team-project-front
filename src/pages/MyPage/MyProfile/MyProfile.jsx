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
import { MyPosts } from "../../../components/Card/MyPostsCard/MyPosts/MyPosts";
import { useSelector } from "react-redux";
import { fetchProfileInfo } from "../../../services/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { BigProfileBox } from "../../../components/Card/PostCard/PostProfile";

function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const { memberId: memberId } = useParams();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    if (memberId) {
      console.log("fetch");
      fetchProfileInfo(memberId)
        .then(({ isMe, data }) => {
          setIsMe(isMe);
          setProfileData(data);
        })
        .catch((err) => setError(err));
    }
  }, []);

  if (!isLoggedIn) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (error) {
    return <div>프로필 정보를 불러오는데 실패했습니다.</div>;
  }

  if (!profileData && isLoggedIn) {
    console.log(profileData);
    return <div>Loading...</div>;
  }

  const redirectToEditPage = () => {
    navigate("/my-page/edit");
  };

  return (
    <>
      <Wrap>
        <ProfileWrap>
          <ProfileTitle>
            <h1>프로필</h1>
          </ProfileTitle>
        </ProfileWrap>
        <Main>
          <ProfileHeader>
            <BigProfileBox
              nickName={profileData.nickname}
              job={profileData.role}
            />
            {isMe ? (
              <ProfileSetting onClick={redirectToEditPage}>
                프로필 수정
              </ProfileSetting>
            ) : null}
          </ProfileHeader>
          <div
            style={{
              width: "90%",
              marginLeft: "5%",
            }}
          >
            <Userintroduce>{profileData.aboutMe}</Userintroduce>
            {isMe ? (
              <MyPosts postCount={profileData.activityStats.postCount} />
            ) : null}
          </div>
        </Main>
      </Wrap>
    </>
  );
}

export default MyProfile;
