import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateToken, userLogout } from "../store/user/userSlice";

const axiosInstance = axios.create({
  baseURL: "https://deepdivers.store",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const needsAuth = config.url.startsWith("/api");
    if (needsAuth) {
      const accessToken = useSelector(
        (state) => state.user.userInfo.accessToken
      );

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const statusCode = error.response ? error.response.status : null;
    const errorCode =
      error.response && error.response.data ? error.response.data.code : null;

    if (originalRequest.url.startsWith("/api") && statusCode === 401) {
      switch (errorCode) {
        case 9001: // 토큰 유효기간 만료
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const refreshToken = useSelector(
                (state) => state.user.userInfo.refreshToken
              );

              const response = await axiosInstance.patch("/tokens/re-issue", {
                refreshToken: refreshToken,
              });

              if (response.status.code !== 8000) {
                throw new Error(response.status.message || "토큰 재발급 실패");
              }

              // 새로운 Access Token 설정
              axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response.result.accessToken}`;

              dispatch(
                updateToken({
                  accessToken: response.result.accessToken,
                  refreshToken: response.result.refreshToken,
                })
              );

              // 원래 요청 재시도
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${response.result.accessToken}`;

              return axiosInstance(originalRequest);
            } catch (refreshError) {
              console.error("토큰 재발급 실패:", refreshError);

              dispatch(userLogout());
              navigate("/login");
            }
          }
          break;

        case 9000:
        case 9002:
        case 9003:
        case 9004:
        case 9005:
          console.error("토큰 관련 오류 발생:", error.response.message);
          dispatch(userLogout());
          navigate("/");
          break;

        default:
          console.error("기타 오류 발생:", error.response.message);
          dispatch(userLogout());
          navigate("/");
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
