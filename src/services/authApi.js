import axios from "axios";

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

export const postInfo = async (memberId, categoryId) => {
  try {
    //const response = await axios.get(`/api/post/${memberId}/${categoryId}`);

    const response = [
      {
        postId: 1,
        postTitle: "게시글 제목",
        count: {
          view: 5,
          like: 55,
          comment: 555,
        },
        postCreatedAt: "게시글 작성 일자",
      },
    ];
    return response;
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
};
