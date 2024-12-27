import useJwt from "./useJwt";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userError, setUserError] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const accessToken = useSelector((state) => state.user.userInfo.accessToken);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const payload = useJwt(accessToken);

    useEffect( () => {

        const fetchUserInfo = async () => {
            if (!isLoggedIn || !payload?.memberId) {
                setUserInfo(null);
                return;
            }

            setIsUserLoading(false);
            setUserError(null);

            const memberId = payload.memberId;

            try {
                const response = await axiosInstance.get(`/api/members/me/${memberId}`);
                const userData = response.data.result;

                if (userData && userData.memberId) {
                    setUserInfo(userData);
                }

            } catch (error) {
                setUserError(error.message);
                console.error("유저 정보를 불러오지 못했습니다. : ", error);
                setUserInfo(null);
            } finally {
                setIsUserLoading(false);
                console.log("유저 정보를 성공적으로 가져왔습니다.");
            }
        }

        fetchUserInfo();

    }, [isLoggedIn, payload?.memberId]);

    return { userInfo, isUserLoading, userError };
};

export default useUserInfo;