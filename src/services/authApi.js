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
    console.log(body);
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
