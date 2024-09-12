export async function fetchPostItems() {
  return [
    {
      id: 1,
      title: "Title",
      content: "This is content.",
      name: "John Doe",
      job: "Software Engineer",
      count: {
        view: 12,
        like: 23,
        comment: 20,
      },
      //+ 썸네일, 사용자 프로필 이미지
    },
    {
      id: 2,
      title: "Title",
      content: "This is content.",
      name: "John Doe",
      job: "Software Engineer",
      count: {
        view: 12,
        like: 23,
        comment: 20,
      },
      //+ 썸네일, 사용자 프로필 이미지
    },
    {
      id: 3,
      title: "Title",
      content: "This is content.",
      name: "John Doe",
      job: "Software Engineer",
      count: {
        view: 12,
        like: 23,
        comment: 20,
      },
      //+ 썸네일, 사용자 프로필 이미지
    },
    {
      id: 5,
      title: "Title",
      content: "This is content.",
      name: "John Doe",
      job: "Software Engineer",
      count: {
        view: 12,
        like: 23,
        comment: 20,
      },
      //+ 썸네일, 사용자 프로필 이미지
    },
    {
      id: 4,
      title: "Title",
      content: "This is content.",
      name: "John Doe",
      job: "Software Engineer",
      count: {
        view: 12,
        like: 23,
        comment: 20,
      },
      //+ 썸네일, 사용자 프로필 이미지
    },
  ];
}

export async function fetchNoticePostItems() {
  return [
    {
      id: 1,
      title: "Title",
      date: "2024-08-28",
      count: {
        view: 12,
      },
    },
    {
      id: 2,
      title: "Title",
      date: "2024-08-28",
      count: {
        view: 12,
      },
    },
    {
      id: 3,
      title: "Title",
      date: "2024-08-28",
      count: {
        view: 12,
      },
    },
    {
      id: 4,
      title: "Title",
      date: "2024-08-28",
      count: {
        view: 12,
      },
    },
  ];
}

export async function fetchMenuItems() {
  return [
    { id: 0, item: "HOT 게시판" },
    { id: 1, item: "자유 게시판" },
    { id: 2, item: "질문 게시판" },
    { id: 3, item: "프로젝트 게시판" },
    { id: 4, item: "공지사항" },
  ].slice();
}

export const join = async (email, password) => {
  // todo: 로그인 api 호출 함수 구현
};

export const signup = async (
  profileImg,
  name,
  email,
  password,
  confirmPassword,
  phoneNum
) => {
  // todo: 회원가입 api 호출 함수 구현(formData)
};

export const edit = async (profileImg, name, email, phoneNum) => {};

export async function fetchPopularPostItems() {
  return [
    {
      id: 1,
      title: "Title 1",
      count: {
        view: 1,
        like: 11,
        comment: 111,
      },
    },
    {
      id: 2,
      title: "Title 2",
      count: {
        view: 2,
        like: 22,
        comment: 222,
      },
    },
    {
      id: 3,
      title: "Title 3",
      count: {
        view: 3,
        like: 33,
        comment: 333,
      },
    },
    {
      id: 4,
      title: "Title 4",
      count: {
        view: 4,
        like: 44,
        comment: 444,
      },
    },
    {
      id: 5,
      title: "Title 5",
      count: {
        view: 5,
        like: 55,
        comment: 555,
      },
    },
  ];
}

export async function fetchPopularHashItems() {
  return [
    {
      id: 1,
      hashtag: "해시태그 1",
      count: 11,
    },
    {
      id: 2,
      hashtag: "해시태그 2",
      count: 22,
    },
    {
      id: 3,
      hashtag: "해시태그 3",
      count: 33,
    },
    {
      id: 4,
      hashtag: "해시태그 4",
      count: 44,
    },
    {
      id: 5,
      hashtag: "해시태그 5",
      count: 55,
    },
  ];
}

export const createcomment = async (body) => {
  await console.log(body);
};

export const fetchcomment = async (postId) => {
  return {
    code: 1301,
    message: "댓글 조회에 성공하였습니다.",
    result: [
      {
        memberInfo: {
          Id: 0,
          nickname: "ALee",
          imageUrl: "~~~",
        },
        commentInfo: {
          content: "comment test",
          recommedCount: 0,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: "수정일자",
          isModified: true,
        },
      },
      {
        memberInfo: {
          Id: 1,
          nickname: "MogensEgeskov",
          imageUrl: "~~~",
        },
        commentInfo: {
          content: "comment test1",
          recommedCount: 2,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: "수정일자",
          isModified: false,
        },
      },
    ],
  };
};

export const findUserId = async (name, phoneNum) => {
  // todo: 아이디 찾기 api 요청
};

export const findUserPw = async (email, name, phoneNum) => {
  // todo: 비밀번호 찾기 api 요청
};

export const fetchMyprofileData = async (userId) => {
  return {
    code: 1300,
    message: "내 정보 불러오기에 성공하였습니다",
    result: {
      userInfo: {
        nickName: "Mogens Egeskov",
        userProfileUrl: "",
        Job: "iOS Developer",
        userIntroduce: "나는야 IOS 개발자",
      },
      Post: {
        freeBoard: [
          {
            user: {
              nickName: "Mogens Egeskov1",
              userProfile: "",
              Job: "iOS Developer1",
            },
            PostContent: {
              title: "test",
              count: { view: 12, like: 3, comment: 3 },
            },
          },
          {
            user: {
              nickName: "Mogens Egeskov2",
              userProfile: "",
              Job: "Android Developer1",
            },
            PostContent: {
              title: "test",
              count: { view: 12, like: 3, comment: 3 },
            },
          },
        ],
        projectBoard: [
          {
            user: {
              nickName: "Mogens Egeskov1",
              userProfile: "",
              Job: "iOS Developer1",
            },
            PostContent: {
              title: "test",
              count: { view: 12, like: 3, comment: 3 },
            },
          },
          {
            user: {
              nickName: "Mogens Egeskov2",
              userProfile: "",
              Job: "Android Developer1",
            },
            PostContent: {
              title: "test2",
              count: { view: 12, like: 3, comment: 3 },
            },
          },
          {
            user: {
              nickName: "Mogens Egeskov3",
              userProfile: "",
              Job: "iOS Developer2",
            },
            PostContent: {
              title: "test",
              count: { view: 12, like: 3, comment: 3 },
            },
          },
        ],
        questionBoard: [
          {
            user: {
              nickName: "Mogens Egeskov1",
              userProfile: "",
              Job: "iOS Developer1",
            },
            PostContent: {
              title: "test",
              count: { view: 12, like: 3, comment: 3 },
            },
          },
        ],
      },
    },
  };
};
