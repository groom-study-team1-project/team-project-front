import axios from "axios";

export const findUserId = async (nickname = "", tel = "") => {
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
    throw error;
  }
};
