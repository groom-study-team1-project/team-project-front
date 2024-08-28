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

export const createPost = (body) => {
  //todo: 글 작성 api호출 구현
};
export default function fetchInmgUrl() {
  return [
    {
      id: 1,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6KVvlziiJYFxZZIq3Xc_dVuzIbSLrgvtHPA&s",
    },
    {
      id: 2,
      url: "https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2021/01/2021-graphic-design-banner.jpg",
    },
    {
      id: 3,
      url: "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/6H5a/image/VbC1Pts-64VW9-xWDV3qad5cLok.jpg",
    },
  ];
}