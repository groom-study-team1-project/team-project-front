import axios from "axios";

export const fetchSearchTitle = async (post_id, searchTerm = "") => {
  try {
    //const response = await axios.post("/posts/{post_id}?category-id=&sort=&tag={searchTerm}, post_id, searchTerm);
    const response = {
      code: 1101,
      message: "게시글 조회에 성공하였습니다.",
      result: {
        memberInfo: {
          memberId: 1,
          memberNickName: "구름이",
        },
        postId: 1,
        categoryId: 0,
        title: "test",
        content: "test",
        commentCount: 0,
        recommendCount: 0,
        viewCount: 0,
        createdAt: "생성일자",
        updatedAt: "수정일자",
      },
    };

    if (response.code === 1101) {
      console.log("조회 성공");
      return response;
    } else {
      throw new Error(response.message || "로그인 실패");
    }
  } catch (error) {
    console.log("로그인 실패:", error);
    throw error;
  }
};

export const fetchSearchMember = async (post_id, searchTerm = "") => {
  try {
    //const response = await axios.post("/posts/{post_id}?category-id=&sort=&tag={searchTerm}, post_id, searchTerm);
    const response = {
      code: 1102,
      message: "게시글 조회에 성공하였습니다.",
      result: {
        memberInfoId: 0,
        categoryId: 0,
        title: "test",
        content: "test",
        commentCount: 0,
        recommendCount: 0,
        viewCount: 0,
        createdAt: "생성일자",
        updatedAt: "수정일자",
      },
    };

    if (response.code === 1102) {
      console.log("조회 성공");
      return response;
    } else {
      throw new Error(response.message || "로그인 실패");
    }
  } catch (error) {
    console.log("로그인 실패:", error);
    throw error;
  }
};

export const fetchSearchTag = async (post_id, searchTerm = "") => {
  try {
    //const response = await axios.post("/posts/{post_id}?category-id=&sort=&tag={searchTerm}, post_id, searchTerm);
    const response = {
      code: 1103,
      message: "게시글 조회에 성공하였습니다.",
      result: {
        memberInfoId: 0,
        categoryId: 0,
        title: "test",
        content: "test",
        commentCount: 0,
        recommendCount: 0,
        viewCount: 0,
        createdAt: "생성일자",
        updatedAt: "수정일자",
      },
    };

    if (response.code === 1103) {
      console.log("조회 성공");
      return response;
    } else {
      throw new Error(response.message || "로그인 실패");
    }
  } catch (error) {
    console.log("로그인 실패:", error);
    throw error;
  }
};
