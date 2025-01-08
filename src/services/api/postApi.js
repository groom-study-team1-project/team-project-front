import axiosInstance from "../axiosConfig";
import { MdCreditCard } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { GrUserSettings } from "react-icons/gr";
import { BsPatchQuestion } from "react-icons/bs";
import { imageUpload } from "./imageApi";

// 새 게시글 생성
export const createPost = async (body) => {
  try {
    const requestBody = {
      title: body.title?.trim(),
      content: body.content?.trim(),
      categoryId: body.categoryId,
      hashtags: body.hashtags || [], // 해시태그 배열
      thumbnailImageKey: body.thumbnailImageKey || "", // 썸네일 이미지 키
      imageKeys: body.imageKeys || [], // 이미지 키 배열
    };

    console.log("Final Request Body in createPost:", requestBody);

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

// 게시글 이미지 업로드 어댑터
export const uploadAdapter = (loader, onImageUploaded) => {
  const uploadImage = async (file) => {
    if (!file) {
      throw new Error("업로드할 파일이 없습니다.");
    }

    // S3에 이미지 업로드 (imageUpload 함수 활용)
    const response = await imageUpload("POST", file);
    if (response.accessImage && response.fileKey) {
      return response; // 업로드된 이미지 URL 및 fileKey 반환
    }

    throw new Error("이미지 업로드 실패");
  };

  return {
    upload: () => {
      return loader.file
          .then(uploadImage) // 파일 업로드 처리
          .then((response) => {
            const { accessImage, fileKey } = response;
            console.log("이미지 업로드 성공:", accessImage);

            // 업로드된 이미지 URL과 fileKey 후처리를 위한 콜백 호출
            if (onImageUploaded) {
              onImageUploaded(accessImage, fileKey);
            }

            return { default: accessImage }; // 에디터에 반환
          })
          .catch((error) => {
            console.error("이미지 업로드 에러:", error.message);
            throw error;
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
      console.log("게시글 조회 성공:", response.data.result);
      return { totalPostCount: response.data.result.length, posts: response.data.result };
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
        `/api/posts/edit/${postId}`,
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
    const response = await axiosInstance.patch(`/api/posts/remove/${postId}`);
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
        자유게시판: <MdCreditCard />,
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

export const sortPostsByCriteria = async (category_id, sort, post_id) => {
  try {
    // const result = await axiosInstance.get(
    //   `/posts/${post_id}?sort=${sort}&category-id=${category_id}`
    // );
    // console.log(result);
    console.log(category_id, sort, post_id);
  } catch (error) {
    console.log(error);
  }
};
