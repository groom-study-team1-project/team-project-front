import axiosInstance from "../axiosConfig";
import { MdCreditCard } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { GrUserSettings } from "react-icons/gr";
import { BsPatchQuestion } from "react-icons/bs";
import { imageUpload } from "./imageApi";

export const createPost = async (body) => {
  try {
    const requestBody = {
      title: body.title?.trim(),
      content: body.content?.trim(),
      thumbnailImageUrl: body.thumbnailImageUrl || "posts/thumbnail.png",
      categoryId: body.categoryId,
      hashtags: body.hashtags || [],
      imageKeys: body.imageKeys || [],
    };

    if (!requestBody.title || !requestBody.content || !requestBody.categoryId) {
      throw new Error("제목, 내용, 카테고리 ID는 필수 입력 항목입니다.");
    }

    const result = await axiosInstance.post("/api/posts/upload", requestBody);
    return result.data;
  } catch (error) {
    console.error(
        error.response
            ? `서버 응답 에러: ${error.response.data}`
            : error.request
                ? `응답 없음 에러: ${error.request}`
                : `예상치 못한 에러: ${error.message}`
    );
    throw error;
  }
};

export const uploadAdapter = (loader, onImageUploaded) => {
  const uploadImage = async (file) => {
    if (!file) {
      throw new Error("업로드할 파일이 없습니다.");
    }

    const response = await imageUpload("POST", file);
    if (response.accessImage && response.fileKey) {
      return response;
    }

    throw new Error("이미지 업로드 실패");
  };

  return {
    upload: () => {
      return loader.file
          .then(uploadImage)
          .then((response) => {
            const { accessImage, fileKey } = response;
            console.log("이미지 업로드 성공:", accessImage);

            if (onImageUploaded) {
              onImageUploaded(accessImage, fileKey);
            }

            return { default: accessImage };
          })
          .catch((error) => {
            console.error("이미지 업로드 에러:", error.message);
            throw error;
          });
    },
  };
};

export async function fetchPostItems(
    categoryId,
    lastPostId,
    postSortType = "RECENT",
    limit = 10
) {
  try {
    const response = await axiosInstance.get("/open/posts", {
      params: { categoryId, lastPostId, postSortType, limit },
    });

    if (
        response.data?.status?.code === 1203 &&
        Array.isArray(response.data.result)
    ) {
      console.log("게시글 조회 성공:", response.data.result);
      return { posts: response.data.result };
    }

    console.warn("예상치 못한 응답 구조 또는 결과가 비어 있습니다.");
    return { posts: [] };
  } catch (error) {
    console.error("게시글 조회 중 오류 발생:", error);
    return { posts: [] };
  }
}

export const fetchPostDetail = async (postId) => {
  try {
    const response = await axiosInstance.get(`/open/posts/${postId}`);
    if (response.data.status.code === 1203) {
      return response.data.result;
    } else {
      throw new Error(
          response.data.status.message || "게시글 상세 조회에 실패했습니다."
      );
    }
  } catch (error) {
    console.error("게시글 상세 조회 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 수정
export const fetchPostChange = async (body, postId) => {
  try {
    const result = await axiosInstance.post(`/api/posts/edit/${postId}`, body);
    return result.data;
  } catch (error) {
    console.error(
        error.response
            ? `서버 응답 에러: ${error.response.data}`
            : error.request
                ? `응답 없음 에러: ${error.request}`
                : `예상치 못한 에러: ${error.message}`
    );
    throw error;
  }
};

export const deletepost = async (postId) => {
  try {
    const response = await axiosInstance.patch(`/api/posts/remove/${postId}`);
    console.log("게시글 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
        error.response
            ? `서버 응답 에러: ${error.response.data}`
            : error.request
                ? `응답 없음 에러: ${error.request}`
                : `예상치 못한 에러: ${error.message}`
    );
    throw error;
  }
};

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
    console.error("카테고리 조회 중 오류 발생:", error);
    throw error;
  }
}

export const sortPostsByCriteria = async (category_id, sort, post_id) => {
  try {
    console.log(category_id, sort, post_id);
  } catch (error) {
    console.error("게시글 정렬 중 오류 발생:", error);
  }
};

export const fetchProjectPosts = async (
    categoryId,
    lastPostId,
    postSortType = "LATEST",
    limit = 10
) => {
  try {
    const response = await axiosInstance.get("/open/posts/project", {
      params: { categoryId, lastPostId, postSortType, limit },
    });

    if (response.data.status.code === 1203) {
      console.log("Project 게시글 조회 성공:", response.data.result);
      return { posts: response.data.result };
    }

    console.warn("예상치 못한 응답 구조 또는 결과가 비어 있습니다.");
    return { posts: [] };
  } catch (error) {
    console.error("Project 게시글 조회 중 오류 발생:", error);
    return { posts: [] };
  }
};

export const fetchProjectPostDetail = async (postId) => {
  try {
    const response = await axiosInstance.get(`/open/posts/project/${postId}`);
    if (response.data.status.code === 1203) {
      console.log("Project 게시글 상세 조회 성공:", response.data.result);
      return response.data.result;
    } else {
      throw new Error(
          response.data.status.message || "상세 조회에 실패했습니다."
      );
    }
  } catch (error) {
    console.error("Project 게시글 상세 조회 중 오류 발생:", error);
    throw error;
  }
};

export const createProjectPost = async (body) => {
  try {
    const requestBody = {
      title: body.title?.trim(),
      content: body.content?.trim(),
      thumbnailImageUrl: body.thumbnailImageUrl || "posts/thumbnail.png",
      categoryId: body.categoryId,
      hashtags: body.hashtags || [],
      imageKeys: body.imageKeys || [],
      slideImageKeys: body.slideImageKeys || [],
    };

    if (!requestBody.title || !requestBody.content || !requestBody.categoryId) {
      throw new Error("제목, 내용, 카테고리 ID는 필수 입력 항목입니다.");
    }

    console.log(requestBody);
    const result = await axiosInstance.post(
        "/api/posts/project/upload",
        requestBody
    );

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

export const editProjectPost = async (postId, body) => {
  try {
    const response = await axiosInstance.post(
        `/api/posts/project/edit/${postId}`,
        body
    );
    return response.data;
  } catch (error) {
    console.error(
        error.response
            ? `서버 응답 에러: ${error.response.data}`
            : error.request
                ? `응답 없음 에러: ${error.request}`
                : `예상치 못한 에러: ${error.message}`
    );
    throw error;
  }
};

export const deleteProjectPost = async (projectId) => {
  try {
    const response = await axiosInstance.delete(
        `/api/posts/project/remove/${projectId}`
    );
    console.log("프로젝트 게시글 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
        error.response
            ? `서버 응답 에러: ${error.response.data}`
            : error.request
                ? `응답 없음 에러: ${error.request}`
                : `예상치 못한 에러: ${error.message}`
    );
    throw error;
  }
};
