import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProfileInfo } from "../../services/api/authApi";
import { useParams } from "react-router-dom";
import useJwt from "../../hooks/useUserInfo";
import { useMediaQuery } from "react-responsive";
import MobailProfile from "./Mobail/MobailProfile";
import DesktopProfile from "./DeskTop/DesktopProfile";
function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isMeData, setIsMe] = useState(false);
  const [profileState, setProfileState] = useState("mypost");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { memberId } = useParams();
  const isSmallDesktop = useMediaQuery({ maxWidth: 1480 });
  const payload = useJwt(localStorage.getItem("accessToken"));
  console.log(isSmallDesktop);
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
  if (isSmallDesktop) {
    return (
      <MobailProfile
        profileData={profileData}
        isMeData={isMeData}
        setProfileState={setProfileState}
        profileState={profileState}
      />
    );
  } else {
    return (
      <DesktopProfile
        profileData={profileData}
        isMeData={isMeData}
        setProfileState={setProfileState}
        profileState={profileState}
      />
    );
  }
}

export default MyProfile;
