import axiosInstance from "../axiosConfig";

export const login = async (body) => {
  try {
    const response = await axiosInstance.post("/members/login", body);
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
    const response = await axiosInstance.post("/members/sign-up", body);
    console.log(response);
    if (response.status.code === 1000) {
      return response;
    } else {
      throw new Error(
        response.data.status.message || "Unexpected response from the server"
      );
    }
  } catch (error) {
    console.log("회원가입 실패:", error);
    throw error;
  }
};

export const uploadProfileImage = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/api/members/me/profile-image",
      body
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("이미지 업로드 실패:", error);
    throw error;
  }
};

export const checkDuplicatedNickname = async (nickname) => {
  try {
    const response = await axiosInstance.get("/accounts/verify/nickname", {
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

    const response = await axiosInstance.get(`/api/members/me/${memberId}`);
    console.log(response);
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
    const response = await axiosInstance.put("/api/members/me", body);
    console.log(response);
  } catch (error) {
    console.error("사용자 정보를 수정하는데 실패했습니다.", error);
    throw error;
  }
};

export const changeUserPw = async (body) => {
  try {
    // const response = await axiosInstance.post("/accounts/reset/password", body);

    const response = {
      status: {
        code: 1008,
        message: "비밀번호 변경이 성공하였습니다.",
      },
    };

    if (response.status.code === 1008) {
      return response.status.message;
    } else {
      throw new Error(response.message || "프로필 수정 실패");
    }
  } catch (error) {
    console.error("비밀번호를 찾던 중 오류 발생:", error);
    throw error;
  }
};

export const postInfo = async (categoryId, lastPostId) => {
  try {
    const response = await axiosInstance.get("/api/members/me/posts", {
      params: {
        categoryId: categoryId,
        lastPostId: lastPostId,
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
    const response = await axiosInstance.post("/accounts/verify/email", body);

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
      "/accounts/authenticate/email",
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
    // const response = await axiosInstance.post("/accounts/authenticate/password", body);

    const response = {
      status: {
        code: 1100,
        message: "이메일로 인증코드가 전송되었습니다.",
      },
    };

    if (response.status.code === 1100) {
      return { success: true, message: response.status.message };
    } else if (response.status.code === 2006) {
      return { success: false, message: response.status.message };
    } else {
      throw new Error(response.message || "유효하지 않은 인증코드");
    }
  } catch (error) {
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
