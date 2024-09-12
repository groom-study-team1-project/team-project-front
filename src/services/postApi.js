export async function fetchCategoryItems() {
  try {
    // const response = await axios.get("/categories");

    const response = {
      code: 1200,
      message: "카테고리 목록 조회에 성공하였습니다.",
      result: [
        { id: 0, item: "HOT 게시판" },
        { id: 1, item: "자유 게시판" },
        { id: 2, item: "질문 게시판" },
        { id: 3, item: "프로젝트 게시판" },
        { id: 4, item: "공지사항" },
      ],
    };

    if (response.code === 1200) {
      return response.result;
    } else {
      throw new Error(response.message || "카테고리를 불러올 수 없습니다.");
    }
  } catch (error) {
    console.log("checking nickname error", error);
    throw error;
  }
}
