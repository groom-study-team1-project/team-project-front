import React, { useEffect, useState } from "react";
import {
  Main,
  ProfileHeader,
  ProfileSetting,
  ProfileTitle,
  ProfileWrap,
  Userintroduce,
  Wrap,
  Label,
  LabelTitle,
  Url,
} from "./MyProfile.style";
import { MyPosts } from "../../../components/Card/MyPostsCard/MyPosts/MyPosts";
import { useSelector } from "react-redux";
import { fetchProfileInfo } from "../../../services/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { BigProfileBox } from "../../../components/Card/PostCard/PostProfile";
import useJwt from "../../../hooks/useJwt";
function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const { memberId } = useParams();
  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    // 프로필 데이터를 가져오는 함수
    const getProfileData = async () => {
      try {
        const body = {
          isMe: payload.memberId,
          memberId: memberId,
        };
        const { isMe, data } = await fetchProfileInfo(body);
        if (data.status.code === 1002) {
          setIsMe(isMe); // 현재 사용자 여부 설정
          setProfileData(data.result); // 프로필 데이터 설정
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(error); // 에러 설정
      }
    };

    getProfileData();
  }, [isLoggedIn, memberId, payload]);

  if (!isLoggedIn) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (error) {
    return <div>프로필 정보를 불러오는데 실패했습니다.</div>;
  }

  if (!profileData && isLoggedIn) {
    return <div>Loading...</div>;
  }

  const redirectToEditPage = () => {
    navigate(`/my-page/edit/${memberId}`);
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
              src={profileData.imageUrl}
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
            <Label>
              <LabelTitle>githubUrl:</LabelTitle>
              <Url href={profileData.githubUrl}>{profileData.githubUrl}</Url>
            </Label>
            <Label>
              <LabelTitle>blogUrl:</LabelTitle>
              <Url href={profileData.blogUrl}>{profileData.blogUrl}</Url>
            </Label>
            <Userintroduce>{profileData.aboutMe}</Userintroduce>
            <MyPosts postCount={profileData.postCount} />
          </div>
        </Main>
      </Wrap>
    </>
  );
}

export default MyProfile;
