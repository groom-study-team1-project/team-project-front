import useJwt from "./useJwt";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";
import axios from "axios";

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState({});

    const accessToken = useJwt((state) => state.userInfo.accessToken);
    const payload = useSelector(accessToken);

    useEffect(() => {

        const memberId = payload.memberId;

        axiosInstance.get(`/api/members/me/${memberId}`)
            .then((response) => {setUserInfo(response)})
            .catch(error => {console.log("유저 정보 불러오기 실패 : ", error)});
    }, [payload.memberId]);

    return userInfo;
}

export default useUserInfo;