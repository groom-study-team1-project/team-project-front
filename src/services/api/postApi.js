import axiosInstance from "../axiosConfig";
import { MdCreditCard } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { GrUserSettings } from "react-icons/gr";
import { BsPatchQuestion } from "react-icons/bs";

// 새 게시글 생성
export const createPost = async (body) => {
  try {
    const requestBody = {
      title: body.title?.trim(), // 제목 (양끝 공백 제거)
      content: body.content?.trim(), // 내용 (양끝 공백 제거)
      categoryId: body.categoryId, // 카테고리 ID
      hashtags: body.hashtags || [], // 해시태그
    };

    // 필수 입력값 확인
    if (!requestBody.title || !requestBody.content || !requestBody.categoryId) {
      throw new Error("제목, 내용, 카테고리 ID는 필수 입력 항목입니다.");
    }

    const result = await axiosInstance.post("/api/posts/upload", requestBody);
    console.log("게시글 생성 성공:", result.data);
    return result.data;
  } catch (error) {
    console.error(
      error.response
        ? "서버 응답 에러: " + error.response.data
        : error.request
        ? "응답 없음 에러: " + error.request
        : "예상치 못한 에러: " + error.message
    );
    throw error;
  }
};

// 이미지 업로드 어댑터
export const uploadAdapter = (loader) => {
  const API_URL = "http://203.232.193.208:7000/api/post/image";
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then((file) => {
          body.append("upload", file);
          axiosInstance
            .post(API_URL, body)
            .then((res) => resolve({ default: res.data.url[0] }))
            .catch(reject);
        });
      });
    },
  };
};

// 게시글 목록 조회
export async function fetchPostItems(categoryId, lastPostId) {
  try {
    console.log("게시글 조회 요청 파라미터:", { categoryId, lastPostId });

    const response = await axiosInstance.get("/open/posts", {
      params: { categoryId, lastPostId },
    });

    if (
      response.data?.status?.code === 1203 &&
      Array.isArray(response.data.result)
    ) {
      const posts = response.data.result;
      console.log("게시글 조회 성공:", posts);
      return { totalPostCount: posts.length, posts };
    }

    console.warn("응답 구조가 예상과 다르거나 결과가 비어있습니다.");
    return { totalPostCount: 0, posts: [] };
  } catch (error) {
    console.error("게시글 조회 에러:", error);
    return { totalPostCount: 0, posts: [] };
  }
}

// 게시글 상세 조회
export const fetchPostDetail = async (postId) => {
  try {
    const response = await axiosInstance.get(`/open/posts/${postId}`);
    if (response.data.status.code === 1203) {
      return response.data.result;
    } else {
      throw new Error(
        response.data.status.message ||
          "게시글을 불러올 수 없거나 존재하지 않습니다."
      );
    }
  } catch (error) {
    console.error("게시글 상세 조회 에러:", error);
    throw error;
  }
};

// 게시글 수정
export const fetchPostChange = async (body, postId) => {
  try {
    console.log(body);
    const result = await axiosInstance.post(
      `/api/posts/update/${postId}`,
      body
    );
    console.log("게시글 수정 성공:", result.data);
    return result.data;
  } catch (error) {
    console.error(
      error.response
        ? "서버 응답 에러: " + error.response.data
        : error.request
        ? "응답 없음 에러: " + error.request
        : "예상치 못한 에러: " + error.message
    );
    throw error;
  }
};

// 게시글 삭제
export const deletepost = async (postId) => {
  try {
    const response = await axiosInstance.patch(`/api/posts/delete/${postId}`);
    console.log("게시글 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      error.response
        ? "서버 응답 에러: " + error.response.data
        : error.request
        ? "응답 없음 에러: " + error.request
        : "예상치 못한 에러: " + error.message
    );
    throw error;
  }
};

// 카테고리 조회
export async function fetchCategoryItems() {
  try {
    const response = await axiosInstance.get("/open/categories");
    if (response.status === 200 || response.data.status.code === 9999) {
      const categoryIconMap = {
        "자유게시판": <MdCreditCard />,
        "프로젝트 자랑 게시판": <IoDocumentsOutline />,
        "질문 게시판": <GrUserSettings />,
        "공지 게시판": <BsPatchQuestion />,
      };

      return response.data.result.map((category) => ({
        ...category,
        icon: categoryIconMap[category.title],
      }));
    }
    throw new Error("카테고리를 불러올 수 없습니다.");
  } catch (error) {
    console.error("카테고리 조회 에러:", error);
    throw error;
  }
}

export const sortPostsByCriteria = async (categoty_id, sort, post_id) => {
  try {
    // const result = await axiosInstance.get(
    //   `/posts/${post_id}?sort=${sort}&categoty-id=${categoty_id}`
    // );
    // console.log(result);
    console.log(categoty_id, sort, post_id);
  } catch (error) {
    console.log(error);
  }
};
