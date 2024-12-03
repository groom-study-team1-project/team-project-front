import useJwt from "./useJwt";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState({});
    const [userError, setUserError] = useState(null);

    const accessToken = useSelector((state) => state.user.userInfo.accessToken);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const payload = useJwt(accessToken);

    useEffect(() => {

        if (!isLoggedIn || !payload?.memberId) {
            setUserInfo(null);
            return;
        }

        setUserError(null);
        const memberId = payload.memberId;

        axiosInstance.get(`/api/members/me/${memberId}`)
            .then((response) => {setUserInfo(response.data)})
            .catch(error => {
                setUserError(error.message);
                console.error("유저 정보 불러오기 실패 : ", error);
            });
    }, [isLoggedIn, payload.memberId]);

    return { userInfo, userError };
}

export default useUserInfo;