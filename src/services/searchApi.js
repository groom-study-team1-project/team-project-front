import axios from "axios";

const mockData = [
  {
    id: 1,
    title: "Title 1",
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
    title: "Title 2",
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
    title: "Title 3",
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
    title: "Title 4",
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
    title: "Title 5",
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

// 페이지 타입에 맞는 검색어 기반 데이터 요청 함수
export const searchPosts = async (pageType, searchTerm = "") => {
  // 검색어가 없을 때는 mockData 바로 반환
  if (!searchTerm.trim()) {
    return mockData;
  }

  const url = `/api/search/${pageType}?query=${searchTerm}`;

  try {
    const response = await axios.get(url);
    return response.data; // title, name, id, job, content, count 데이터 반환
  } catch (error) {
    console.error("Error fetching data:", error);
    return mockData; // 에러 발생 시 mockData 반환
  }
};
