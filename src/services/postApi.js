import axios from "axios";

export const createPost = async (body, token) => {
  try {
    console.log(body);
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // const result = await axios.post("/api/posts/upload", body, {
    //   headers: headers,
    // });
    // redirect(`${result.result.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostdetail = async (postId) => {
  const result1 = {
    code: 1201,
    message: "게시글 조회에 성공하였습니다.",
    result: {
      categoryInfo: {
        id: 1,
        title: "프로젝트 자랑 게시판",
      },
      memberInfo: {
        Id: 0,
        nickname: "MogensEgeskov",
        development: "iOS Developer",
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
  try {
    //const result = await axios.get(`/posts/${postId}`);
    console.log("result", result1);
    return result1.result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostChange = async (body, postId, token) => {
  try {
    console.log(body);
    console.log(postId);
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // const result = await axios.put(`/api/posts/${postId}`, body, {
    //   headers: headers,
    // });
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
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // await axios.delete(`/api/posts/${postId}`, {
    //   headers: headers,
    // });
  } catch (error) {
    console.log(error);
  }
};

export const sortPostsByCriteria = async (categoty_id, sort, post_id) => {
  try {
    // const result = await axios.get(
    //   `/posts/${post_id}?sort=${sort}&categoty-id=${categoty_id}`
    // );
    // console.log(result);
    await console.log(categoty_id, sort, post_id);
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
          axios
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
