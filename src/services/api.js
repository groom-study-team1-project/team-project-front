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

export async function fetchSideBarMenuItems() {
  return [
    { id: 1, item: "dummy", link: "#" },
    { id: 2, item: "dummy", link: "#" },
    { id: 3, item: "dummy", link: "#" },
    { id: 4, item: "dummy", link: "#" },
    { id: 5, item: "dummy", link: "#" },
  ];
}
