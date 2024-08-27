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
