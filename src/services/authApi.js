import axios from "axios";

export const findUserPw = async (email = "") => {
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
