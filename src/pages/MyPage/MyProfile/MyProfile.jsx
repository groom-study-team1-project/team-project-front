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
import { useNavigate, useParams } from "react-router-dom";

function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isMine, setIsMine] = useState(false);
  const email = useSelector((state) => state.user.userInfo.email).split("@")[0];
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const { id: memberId } = useParams();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    if (memberId) {
      fetchProfileInfo(memberId)
        .then((data) => setProfileData(data))
        .catch((err) => setError(err));
    }

    if (email === memberId) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [memberId, isLoggedIn]);

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
            <ProfileLeft
              width={"200px"}
              height={"200px"}
              marginRight={"32px"}
              nickName={profileData.result.nickname}
              job={profileData.result.role}
            />
            {isMine ? (
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
            <Userintroduce>{profileData.result.aboutMe}</Userintroduce>
            {isMine ? <PostCollection memberId={memberId} /> : null}
          </div>
        </Main>
      </Wrap>
    </>
  );
}

export default MyProfile;
