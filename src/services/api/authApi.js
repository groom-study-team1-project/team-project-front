import { redirect } from "react-router-dom";
import axiosInstance from "../axiosConfig";

export const login = async (body) => {
  try {
    // const response = await axiosInstance.post("/members/login", body);
    const response = {
      status: {
        code: 9999,
        message: "응답 성공 메시지입니다.",
      },
      result: {
        accessToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJOaWNrbmFtZSI6Iuq1rOumhOydtCIsIm1lbWJlclJvbGUiOiJOT1JNQUwiLCJtZW1iZXJJZCI6MTEsIm1lbWJlckltYWdlVXJsIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9wcm9maWxlLnBuZyIsImV4cCI6MTcyNzQxOTAzNiwiaWF0IjoxNzI3NDE3MjM2fQ.2qPdHtUxJPMI6XHaeKvS0zTiqQ5N8v77Scij-XzyikM",
        refreshToken: "header.payload.signature",
      },
    };

    if (response.status.code === 9999) {
      return response.result;
    } else {
      throw new Error(response.status.message || "로그인 실패");
    }
  } catch (error) {
    console.log("로그인 실패:", error);
    throw error;
  }
};

export const signUp = async (body) => {
  try {
    //const response = await axiosInstance.post("/members/sign-up", body);
    const response = {
      status: {
        code: 1000,
        message: "사용자 회원가입에 성공하였습니다.",
      },
    };

    if (response.status.code === 1000) {
      return response;
    } else {
      throw new Error(response.status.message || "회원가입 실패");
    }
  } catch (error) {
    console.log("로그인 실패:", error);
    throw error;
  }
};

export const uploadProfileImage = async (body) => {
  try {
    // const response = await axiosInstance.post("/api/members/profile-image", body);

    const response = {
      status: {
        code: 9999,
        message: "응답 성공 메시지입니다.",
      },
      result: {
        imageUrl:
          "http://localhost:4566/test-bucket/profiles/11/2b776b15_1725181775362.jpeg",
      },
    };
    if (response.status.code === 9999) {
      return response;
    } else {
      throw new Error(
        response.status.message || "업로드 할 수 없는 이미지입니다."
      );
    }
  } catch (error) {
    console.log("이미지 업로드 실패:", error);
    throw error;
  }
};

export const checkDuplicatedNickname = async (name) => {
  try {
    // const response = await axiosInstance.get("/members/validate/nickname", {
    //   params: { nickname: name },
    // });

    const response = {
      code: 1003,
      message: "사용가능한 이름 입니다.",
    };

    if (response.code === 1003) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("checking nickname error", error);
    throw error;
  }
};

export const checkDuplicatedEmail = async (email) => {
  try {
    // const response = await axiosInstance.get("/members/validate/email", {
    //   params: { email },
    // });

    const response = {
      code: 1004,
      message: "사용가능한 이메일 입니다.",
    };

    if (response.code === 1004) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("checking email error", error);
    throw error;
  }
};

export const logout = async (accessToken) => {
  try {
    // const response = await axiosInstance.post(
    //   "/api/members/log-out",
    // );
    const response = {
      code: 1002,
      message: "사용자 로그아웃에 성공하였습니다.",
    };

    if (response.code === 1002) {
      console.log("로그아웃 성공:", response.message);
    } else {
      throw new Error(response.data.message || "로그아웃 실패");
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfileInfo = async (memberId) => {
  let isMe = true;

  try {
    // const response = await axiosInstance.get(`/api/members/me/${memberId}`);

    const response = {
      status: {
        code: 1002,
        message: "본인 프로필 조회에 성공하였습니다.",
      },
      result: {
        nickname: "구름이",
        role: "NORMAL",
        imageUrl: "http://localhost:8080/images/profile.png",
        aboutMe: "나는 구름이",
        phoneNumber: "010-1234-5678",
        githubUrl: "",
        blogUrl: "",
        activityStats: {
          postCount: 0,
          commentCount: 0,
        },
      },
    };

    if (response.status.code === 1002) {
      return { isMe, data: response.result };
    } else if (response.status.code === 1003) {
      isMe = false;
      return { isMe, data: response.result };
    } else {
      throw new Error(response.message || "프로필 조회 실패");
    }
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
};

export const editProfile = async (body) => {
  try {
    // const response = await axiosInstance.put("/api/members/me", body);

    const response = {
      status: {
        code: 9999,
        message: "응답 성공 메시지입니다.",
      },
      result: {
        nickname: "구름이",
        role: "NORMAL, STUDENT, GRADUATE",
        imageUrl: "image.png",
        aboutMe: "안녕하세요. 구름톤 딥다이브 수강생입니다.",
        phoneNumber: "010-1234-5678",
        githubUrl: "https://github.com",
        blogUrl: "https://velog.io",
        activityStats: {
          postCount: 0,
          commentCount: 0,
        },
      },
    };

    if (response.status.code === 9999) {
      return response.status.message;
    } else {
      throw new Error(response.message || "프로필 수정 실패");
    }
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
};

export const findUserId = async (nickname, tel) => {
  try {
    // const response = await axiosInstance.get("/members/me/email", {
    //   params: {
    //     nickname,
    //     tel,
    //   },
    // });
    const response = {
      code: 1006,
      message: "이메일 찾기에 성공했습니다.",
      success: true,
      params: {
        nickname: "구름이",
        tel: "010-1234-5678",
      },
      result: {
        email: "test@mail.com",
      },
    };

    if (nickname === response.params.nickname && tel === response.params.tel) {
      return response;
    } else {
      return {
        success: false,
        message: "이메일 찾기에 실패했습니다.",
      };
    }

    // return response;
  } catch (error) {
    console.error("회원 정보를 가져오는 중 오류 발생:", error);
  }
};

export const findUserPw = async (email, nickname, tel) => {
  try {
    // const response = await axiosInstance.get("/members/me/password", {
    //   params: {
    //     email,
    //     nickname,
    //     tel
    //   },
    // });
    const response = {
      code: 1007,
      message: "비밀번호 찾기에 성공했습니다.",
      success: true,
      params: {
        email: "test@mail.com",
        nickname: "구름이",
        tel: "010-1234-5678",
      },
      result: {
        password: "testPassword",
      },
    };

    if (
      email === response.params.email &&
      nickname === response.params.nickname &&
      tel === response.params.tel
    ) {
      return response;
    } else {
      return {
        success: false,
        message: "비밀번호 찾기에 실패했습니다.",
      };
    }
  } catch (error) {
    console.error("비밀번호를 찾던 중 오류 발생:", error);
    throw error;
  }
};

export const postInfo = async (categoryId, lastPostId) => {
  try {
    // const response = await axiosInstance.get("/api/members/me/posts", {
    //   params: {
    //     categoryId: categoryId,
    //     lastPostId: lastPostId,
    //   },
    // });

    const response = {
      status: {
        code: 9999,
        message: "응답 성공 메시지입니다.",
      },
      result: [
        {
          id: 1,
          title: "string",
          createdAt: "2024-09-27T14:02:42.188Z",
          memberId: 0,
          memberNickname: "John Doe",
          memberJob: "IOS Developer",
          likedMe: true,
          count: {
            view: 0,
            like: 0,
            comment: 0,
          },
        },
      ],
    };

    if (response.status.code === 9999) {
      return response.result;
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
    // const response = await axiosInstance.post("/accounts/verify/email", body);

    const response = {
      status: {
        code: 1101,
        message: "사용자 이메일 인증이 성공하였습니다.",
      },
    };

    if (response.status.code === 1101) {
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
    // const response = await axiosInstance.post("/accounts/authenticate/email", body);

    const response = {
      status: {
        code: 1100,
        message: "이메일로 인증코드가 전송되었습니다.",
      },
    };

    if (response.status.code === 1100) {
      return { success: true, message: response.status.message };
    } else if (response.status.code === 2003) {
      return { success: false, message: response.status.message };
    } else {
      throw new Error(response.message || "유효하지 않은 인증코드");
    }
  } catch (error) {
    console.error("유효하지 않은 인증코드", error);
    throw error;
  }
};
