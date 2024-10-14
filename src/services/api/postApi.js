import axiosInstance from "../axiosConfig";

export const createPost = async (body, token) => {
  try {
    console.log(body);
    // const result = await axiosInstance.post("/api/posts/upload", body);
    // redirect(`${result.result.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const uploadAdapter = (loader) => {
  const API_URL = "http://localhost:7000/api/post/image";

  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then((file) => {
          body.append("upload", file);
          axiosInstance
            .post(`${API_URL}`, body)
            .then((res) => {
              resolve({
                default: res.data.url[0],
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    },
  };
};

export async function fetchPostItems(categoryId, lastPostId) {
  try {
    // const response = await axiosInstance.get("/open/posts", {
    //   params: {
    //     categoryId: categoryId,
    //     lastPostId: lastPostId,
    //   },
    // });

    const response = {
      status: {
        code: 1203,
        message: "게시글 조회에 성공하였습니다.",
      },
      result: {
        totalPostCount: 100,
        posts: [
          {
            postId: 8,
            title: "여덟 번째 게시글",
            content: "여덟 번째 게시글의 내용입니다.",
            imgUrl: [
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
            ],
            categoryId: 1,
            memberInfo: {
              memberId: 8,
              nickname: "User8",
              imageUrl: "http://example.com/image8.jpg",
            },
            countInfo: {
              viewCount: 80,
              likeCount: 0,
              commentCount: 0,
            },
            hashtags: [],
            createdAt: "2024-09-29 13:30:36",
          },
          {
            postId: 4,
            title: "네 번째 게시글",
            content: "네 번째 게시글의 내용입니다.",
            imgUrl: [
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
            ],
            categoryId: 1,
            memberInfo: {
              memberId: 4,
              nickname: "User4",
              imageUrl: "http://example.com/image4.jpg",
            },
            countInfo: {
              viewCount: 40,
              likeCount: 0,
              commentCount: 0,
            },
            hashtags: [],
            createdAt: "2024-09-29 13:30:36",
          },
          {
            postId: 1,
            title: "첫 번째 게시글",
            content: "첫 번째 게시글의 내용입니다.",
            imgUrl: [
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
            ],
            categoryId: 1,
            memberInfo: {
              memberId: 1,
              nickname: "User1",
              imageUrl: "http://example.com/image1.jpg",
            },
            countInfo: {
              viewCount: 10,
              likeCount: 0,
              commentCount: 0,
            },
            hashtags: [],
            createdAt: "2024-09-29 13:30:36",
          },
          {
            postId: 9,
            title: "아홉 번째 게시글",
            content: "아홉 번째 게시글의 내용입니다.",
            imgUrl: [
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
            ],
            categoryId: 2,
            memberInfo: {
              memberId: 9,
              nickname: "User9",
              imageUrl: "http://example.com/image9.jpg",
            },
            countInfo: {
              viewCount: 90,
              likeCount: 0,
              commentCount: 0,
            },
            hashtags: [],
            createdAt: "2024-09-29 13:30:36",
          },
          {
            postId: 5,
            title: "다섯 번째 게시글",
            content: "다섯 번째 게시글의 내용입니다.",
            imgUrl: [
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
            ],
            categoryId: 2,
            memberInfo: {
              memberId: 5,
              nickname: "User5",
              imageUrl: "http://example.com/image5.jpg",
            },
            countInfo: {
              viewCount: 50,
              likeCount: 0,
              commentCount: 0,
            },
            hashtags: [],
            createdAt: "2024-09-29 13:30:36",
          },
          {
            postId: 2,
            title: "두 번째 게시글",
            content: "두 번째 게시글의 내용입니다.",

            imgUrl: [
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
            ],
            categoryId: 2,
            memberInfo: {
              memberId: 2,
              nickname: "User2",
              imageUrl: "http://example.com/image2.jpg",
            },
            countInfo: {
              viewCount: 20,
              likeCount: 0,
              commentCount: 0,
            },
            hashtags: [],
            createdAt: "2024-09-29 13:30:36",
          },
        ],
      },
    };

    if (response.status.code === 1203) {
      return {
        totalPostCount: response.result.totalPostCount,
        posts: response.result.posts,
      };
    } else {
      throw new Error(response.message || "게시글 불러오기 실패");
    }
  } catch (error) {
    console.log(error);
  }
}

export const fetchPostDetail = async (postId) => {
  try {
    //const result = await axiosInstance.get(`open/posts/${postId}`);
    console.log(1);
    const response = {
      status: {
        code: 1203,
        message: "게시글 조회에 성공하였습니다.",
      },
      result: {
        postId: 1,
        title: "첫 번째 게시글",
        content: "첫 번째 게시글의 내용입니다.",
        categoryId: 3,
        memberInfo: {
          memberId: 1,
          nickname: "User1",
          imageUrl:
            "data:image/png;base64,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",
          memberJob: "IOS Developer",
        },
        countInfo: {
          viewCount: 11,
          likeCount: 0,
          commentCount: 0,
        },
        hashtags: ["#test"],
        imgUrl: [
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
        ],
        createdAt: "2024-09-29",
      },
    };

    if (response.status.code === 1203) {
      return response.result;
    } else {
      throw new Error(
        response.message || "게시글을 불러올 수 없거나 존재하지 않습니다."
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostChange = async (body, postId, token) => {
  try {
    console.log(body);
    console.log(postId);
    // const result = await axiosInstance.put(`/api/posts/${postId}`, body);
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const deletepost = async (postId, token) => {
  try {
    const response = {
      code: 1204,
      message: "해당 게시글이 삭제되었습니다.",
    };
    console.log(response.message);
    // await axiosInstance.delete(`/api/posts/delete/${postId}`);
  } catch (error) {
    console.log(error);
  }
};

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

export async function fetchCategoryItems() {
  try {
    // const response = await axiosInstance.get("/categories");

    const response = {
      code: 1200,
      message: "카테고리 목록 조회에 성공하였습니다.",
      result: [
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
