import axiosInstance from "../axiosConfig";

export const login = async (body) => {
  try {
    const response = await axiosInstance.post("/open/members/login", body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("Error Response Data:", error.response.data); // 에러 응답 데이터 출력
      return error.response.data;
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

export const signUp = async (body) => {
  try {
    const response = await axiosInstance.post("/open/members/sign-up", body);
    console.log(response);
    if (response.data.status.code === 1000) {
      return response;
    } else {
      throw new Error(
        response.data.status.message || "Unexpected response from the server"
      );
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("Error Response Data:", error.response.data); // 에러 응답 데이터 출력
      return error.response.data;
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

export const uploadProfileImage = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/members/me/profile-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const checkDuplicatedNickname = async (nickname) => {
  try {
    const response = await axiosInstance.get("/open/accounts/verify/nickname", {
      params: { nickname: nickname },
    });
    console.log(response);

    if (response.data.status.code === 1102) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("Error Response Data:", error.response.data); // 에러 응답 데이터 출력
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export const fetchProfileInfo = async (body) => {
  try {
    const { isMe, memberId } = body;

    const response = await axiosInstance.get(`/open/members/me/${memberId}`);
    if (response.data.status.code === 1002) {
      if (isMe === response.data.result.id) {
        return { isMe: true, data: response.data }; // 응답 데이터 반환
      } else {
        return { isMe: false, data: response.data };
      }
    } else {
      throw new Error(
        response.data.status.message || "Unexpected response from the server"
      );
    }
  } catch (error) {
    console.error(
      "Error in fetchProfileInfo:",
      error.response || error.message
    );
    throw error;
  }
};

export const editProfile = async (body) => {
  try {
    console.log(body);
    const result = await axiosInstance.put("/api/members/me", body);
    console.log(result);
  } catch (error) {
    console.error("사용자 정보를 수정하는데 실패했습니다.", error);
    throw error;
  }
};

export const changeUserPw = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/open/accounts/reset/password",
      body
    );

    if (response.data.status.code === 1008) {
      return response.data.status.message;
    }
  } catch (error) {
    if (error.response) {
      console.log("Error Response Data:", error.response.data); // 에러 응답 데이터 출력
      return { success: false, message: error.response.data.message };
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

export const postInfo = async (
  categoryId,
  lastPostIdByCategory,
  limit,
  memberId
) => {
  try {
    const response = await axiosInstance.get(`/open/posts/me/${memberId}`, {
      params: {
        categoryId: categoryId,
        lastPostId: lastPostIdByCategory,
        postSortType: "LATEST",
        limit: limit,
      },
    });
    if (response.data.status.code === 1009) {
      return response.data.result;
    } else {
      throw new Error(response.message || "내가 작성한 글 불러오기 실패");
    }
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
};

// 인증 코드 검사
export const verifyEmailCode = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/open/accounts/verify/email",
      body
    );

    if (response.data.status.code === 1101) {
      return true;
    } else {
      throw new Error(response.message || "유효하지 않은 인증코드");
    }
  } catch (error) {
    console.error("유효하지 않은 인증코드", error);
    throw error;
  }
};

// 이메일 인증 코드 전송
export const sendEmailVerificationCode = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/open/accounts/authenticate/email",
      body
    );
    console.log(response);

    if (response.data.status.code === 1100) {
      return { success: true, message: response.data.status.message };
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("Error Response Data:", error.response.data); // 에러 응답 데이터 출력
      return { success: false, message: error.response.data.message };
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

// 이메일 인증 코드 전송 (비밀번호)
export const sendEmailVerificationCodePassword = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/open/accounts/authenticate/password",
      body
    );
    console.log(response);

    if (response.data.status.code === 1100) {
      return { success: true, message: response.data.status.message };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    }
    console.error("유효하지 않은 인증코드", error);
    throw error;
  }
};

export const changePW = async (body) => {
  try {
    const response = await axiosInstance.patch(
      "/api/members/me/password",
      body
    );

    if (response.data.status.code === 1008) {
      return { success: true, msg: response.data.status.message };
    } else {
      return { success: false, msg: response.data.status.message };
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      return { success: false, msg: error.response.data.message };
    } else {
      console.error("유효하지 않은 인증코드", error);
    }
    throw error;
  }
};
