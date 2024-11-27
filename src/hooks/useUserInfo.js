import useJwt from "./useJwt";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";

const useUserInfo = async () => {

    const [userInfo, setUserInfo] = useState([]);

    const accessToken = useJwt((state) => state.userInfo.accessToken);
    const payload = useSelector(accessToken);

    useEffect(() => {

        const fetchUserInfo = async () => {
            try {

                const memberId = payload.memberId;

                const response = await axiosInstance.get(`/api/members/me/${memberId}`);

                setUserInfo(response.data.result);

            } catch (error) {
                console.log("can't call userInfo", error);
            }
        };

        fetchUserInfo();

    }, [payload.memberId]);

    return userInfo;
}