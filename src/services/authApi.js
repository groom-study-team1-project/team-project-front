import axios from "axios";
import { redirect } from "react-router-dom";

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

export const findUserId = async (nickname, tel) => {
  try {
    // const response = await axios.get("/members/me/email", {
    //   params: {
    //     nickname,
    //     tel,
    //   },
    // });
    const response = {
      code: 1006,
      message: "이메일 찾기에 성공했습니다.",
      result: {
        email: "test@mail.com",
      },
    };
    return response;
  } catch (error) {
    console.error("회원 정보를 가져오는 중 오류 발생:", error);
  }
};

export const findUserPw = async (email, nickname, tel) => {
  try {
    // const response = await axios.get("/members/me/password", {
    //   params: {
    //     email,
    //     nickname,
    //     tel
    //   },
    // });
    const response = {
      code: 1007,
      message: "비밀번호 찾기에 성공했습니다.",
      result: {
        password: "testPassword",
      },
    };
    return response;
  } catch (error) {
    console.error("비밀번호를 찾던 중 오류 발생:", error);
    throw error;
  }
};
