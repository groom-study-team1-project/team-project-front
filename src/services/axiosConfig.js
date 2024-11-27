import axios from "axios";
import { updateToken, userLogout } from "../store/user/userSlice";

const axiosInstance = axios.create({
  baseURL: "https://deepdivers.store/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Redux Toolkit과 React Router 통합
export const setupAxiosInterceptors = (store, navigate) => {
  // 요청 인터셉터

  axiosInstance.interceptors.request.use(
    (config) => {
      // 요청 URL이 "/api"로 시작하는 경우에만 Authorization 헤더 추가
      if (config.url.startsWith("/api")) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.request.use(
    (config) => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");
        // Refresh Token이 필요한 특정 요청에만 헤더 추가
        const urlsRequiringRefreshToken = ["/tokens/re-issue"];
        if (urlsRequiringRefreshToken.some((url) => config.url.includes(url))) {
          if (refreshToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            config.headers["Refresh-Token"] = refreshToken; // Refresh-Token 헤더에 추가
          } else {
            console.warn("No Refresh Token found in localStorage.");
          }
        }

        return config;
      } catch (error) {
        console.error("Error in Request Interceptor:", error);
        throw error; // 에러 발생 시 요청을 중단
      }
    },
    (error) => {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const errorCode =
        error.response && error.response.data ? error.response.data.code : null;

      if (
        originalRequest.url.startsWith("/api") &&
        errorCode.toString().startsWith("90")
      ) {
        switch (errorCode) {
          case 9001: // 토큰 유효기간 만료
            originalRequest._retry = true;
            try {
              const response = await axiosInstance.patch("/tokens/re-issue");
              console.log(response);
              if (response.data.status.code !== 8000) {
                throw new Error(
                  response.data.status.message || "토큰 재발급 실패"
                );
              }

              // 새로운 Access Token Redux에 업데이트
              store.dispatch(
                updateToken({
                  accessToken: response.data.result.accessToken,
                  refreshToken: response.data.result.refreshToken,
                })
              );
              const accessToken = response.data.result.accessToken;
              // 원래 요청에 새로운 Access Token 적용
              if (accessToken) {
                originalRequest.headers[
                  "Authorization"
                ] = `Bearer ${accessToken}`;
                console.log(originalRequest);
                return axiosInstance(originalRequest); // 원래 요청 재시도
              }
            } catch (refreshError) {
              console.error("토큰 재발급 실패:", refreshError);

              store.dispatch(userLogout());
              navigate("/"); // 로그인 페이지로 이동
            }
            break;

          case 9000: // 기타 토큰 관련 오류
          case 9002:
          case 9003:
          case 9004:
          case 9005:
            console.error("토큰 관련 오류 발생:", error.response.data.message);
            store.dispatch(userLogout());
            navigate("/"); // 홈으로 이동
            break;

          default:
            console.error("기타 오류 발생:", error.response.data.message);
            store.dispatch(userLogout());
            navigate("/");
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
