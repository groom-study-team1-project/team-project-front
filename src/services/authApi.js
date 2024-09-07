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
