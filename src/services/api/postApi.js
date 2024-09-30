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
      totalPostCount: 100,
      result: [
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
    };

    if (response.status.code === 1203) {
      return {
        totalPostCount: response.totalPostCount,
        posts: response.result,
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
    //const result = await axiosInstance.get(`/posts/${postId}`);

    const response = {
      code: 1203,
      message: "게시글 조회에 성공하였습니다.",
      result: {
        categoryInfo: {
          id: 2,
          title: "프로젝트 자랑 게시판",
        },
        memberInfo: {
          Id: 0,
          nickname: "MogensEgeskov",
          development: "iOS Developer",
          email: "lkjj",
          imageUrl: "~~~",
        },
        postInfo: {
          title: "UI Templates",
          content:
            "<p>My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video. My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video. My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video.My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video. My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. </p>",
          viewCount: 12,
          commentCount: 12,
          recommedCount: 12,
          createdAt: new Date().toLocaleDateString(),
          isModified: true,
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
        },
      },
    };

    if (response.code === 1201) {
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
