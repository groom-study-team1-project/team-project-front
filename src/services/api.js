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