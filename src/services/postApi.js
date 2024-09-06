import axios from "axios";
import { redirect } from "react-router-dom";

export const createPost = async (body, token) => {
  try {
    console.log(body);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.post("/api/posts/upload", body, {
      headers: headers,
    });
    redirect(`${result.result.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostdetail = async (postId) => {
  return {
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
};
