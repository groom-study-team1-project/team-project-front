import axios from "axios";
import { redirect } from "react-router-dom";

const API_URL = "http://localhost:8080";

export const login = async (body) => {
  try {
    //const response = await axios.post("/members/login", body);
    const response = {
      code: 1001,
      message: "사용자 로그인에 성공하였습니다.",
      result: {
        accessToken: "aenfaef.aefaefae.faefae",
        refreshToken: "asfasfasf.asfasf.safasf",
      },
    };

    if (response.code === 1001) {
      return response;
    } else {
      throw new Error(response.message || "로그인 실패");
    }
  } catch (error) {
    console.log("로그인 실패:", error);
    throw error;
  }
};

export const signUp = async (body) => {
  try {
    //const response = await axios.post("/members/sign-up", body);
    const response = {
      code: 1000,
      message: "사용자 회원가입에 성공하였습니다.",
    };
    if (response.code === 1000) {
      return response;
    } else {
      throw new Error(response.message || "회원가입 실패");
    }
  } catch (error) {
    console.log("로그인 실패:", error);
    throw error;
  }
};

export const uploadProfileImage = async (body) => {
  try {
    //const response = await axios.post("/api/members/profile-image", body);
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
    // const response = await axios.get(`${API_URL}/members/validate/nickname`, {
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
    // const response = await axios.get(`${API_URL}/members/validate/email`, {
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
    // const response = await axios.post(
    //   "/api/members/log-out",
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   }
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
  try {
    //const response = await axios.get(`/api/members/${memberId}/me`);

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
        contact: {
          phoneNumber: "010-1234-5678",
          githubUrl: "https://github.com",
          blogUrl: "https://velog.io",
        },
        activityStats: {
          postCount: 0,
          commentCount: 0,
        },
      },
    };
    return response;
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
};

export const editProfile = async (body) => {
  try {
    //const response = await axios.put("/api/members/me/profile", body);

    const response = {
      code: 1007,
      message: "프로필 수정이 성공하였습니다.",
      result: {
        nickname: body.nickname,
        imageUrl: "http://localhost:8080/images/profile.png",
        aboutMe: "자기소개",
        tel: "010-0000-0000",
        role: "IOS Developer",
        githubUrl: "https://github.com/abcd",
        blogUrl: "blog",
        activityStats: {
          postCount: "0",
          commentCount: "0",
        },
      },
    };
    return response;
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
};
