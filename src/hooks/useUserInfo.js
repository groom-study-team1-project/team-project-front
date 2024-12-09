import useJwt from "./useJwt";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userError, setUserError] = useState(null);
    const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);

    const accessToken = useSelector((state) => state.user.userInfo.accessToken);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const payload = useJwt(accessToken);

    useEffect(() => {

        setIsUserInfoLoading(true);

        if (!isLoggedIn || !payload?.memberId) {
            setUserInfo(null);
            setIsUserInfoLoading(false);
            return;
        }

        setUserError(null);
        const memberId = payload.memberId;

        axiosInstance.get(`/api/members/me/${memberId}`)
            .then((response) => {
                const userData = response.data.result;
                if (userData && userData.id) {
                    setUserInfo(userData);
                }
                else {
                    console.error("유효한 유저 정보를 가져오지 못했습니다.");
                    setUserInfo(null);
                }
            })
            .catch(error => {
                setUserError(error.message);
                console.error("유저 정보 불러오기 실패 : ", error);
                setUserInfo(null);
            })
            .finally(() => {
                console.log("유저 정보 불러오기 성공");
                setIsUserInfoLoading(false);
            })
    }, [isLoggedIn, payload?.memberId]);

    return { userInfo, isUserInfoLoading };
};

export default useUserInfo;