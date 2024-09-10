import axios from "axios";

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

const checkDuplicatedNickname = async (name) => {
  try {
    const res = await axios.get(`${API_URL}/members/validate/nickname`, {
      params: { nickname: name },
    });
    return res.data;
  } catch (error) {
    console.log("checking nickname error", error);
    throw error;
  }
};

const checkDuplicatedEmail = async (email) => {
  try {
    const res = await axios.get(`${API_URL}/members/validate/email`, {
      params: { email },
    });
    return res.data;
  } catch (error) {
    console.log("checking email error", error);
    throw error;
  }
};

export { checkDuplicatedNickname, checkDuplicatedEmail };
