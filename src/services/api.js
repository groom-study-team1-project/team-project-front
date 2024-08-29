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
  ];
}

export async function fetchMenuItems() {
  return [
    { id: 1, item: "Dummy" },
    { id: 2, item: "Dummy" },
    { id: 3, item: "Dummy" },
    { id: 4, item: "Dummy" },
    { id: 5, item: "Dummy" },
  ];
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
