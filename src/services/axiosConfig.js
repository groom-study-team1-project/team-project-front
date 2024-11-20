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
      const accessToken = store.getState().user.userInfo.accessToken;
      console.log("Access Token in Interceptor:", accessToken);
      if (accessToken) {
        console.log(accessToken);
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
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

      const statusCode = error.response ? error.response.status : null;
      const errorCode =
        error.response && error.response.data ? error.response.data.code : null;

      if (originalRequest.url.startsWith("/api") && statusCode === 401) {
        switch (errorCode) {
          case 9001: // 토큰 유효기간 만료
            if (!originalRequest._retry) {
              originalRequest._retry = true;
              try {
                const refreshToken =
                  store.getState().user.userInfo.refreshToken; // 리프레시 토큰 가져오기

                const response = await axiosInstance.patch("/tokens/re-issue", {
                  refreshToken: refreshToken,
                });

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

                // 원래 요청에 새로운 Access Token 적용
                originalRequest.headers[
                  "Authorization"
                ] = `Bearer ${response.data.result.accessToken}`;

                return axiosInstance(originalRequest); // 원래 요청 재시도
              } catch (refreshError) {
                console.error("토큰 재발급 실패:", refreshError);

                store.dispatch(userLogout());
                navigate("/login"); // 로그인 페이지로 이동
              }
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
            break;
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
