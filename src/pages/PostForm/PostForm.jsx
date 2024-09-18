import { useParams } from "react-router-dom";
import WriteBoard from "../WriteBoard/WriteBoard";

const PostForm = () => {
  const result1 = [
    {
      code: 1201,
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
          imageUrl: "~~~",
        },
        postInfo: {
          id: 1,
          title: "UI Templates",
          content:
            "<p>My first iOS app is available on the AppStore. I literally didn’t know anything about SwiftUI (still not much) and in probably 4 weeks was able to recreate my android app for iOS. Highly recommend MengTo video.</p>",
          viewCount: 12,
          commentCount: 12,
          recommedCount: 12,
          createdAt: new Date().toLocaleDateString(),
          isModified: true,
          hashtags: ["#test", "#222"],
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
    },
  ];

  const { postId } = useParams(); // URL에서 postId 가져오기

  if (postId) {
    const selectedPost = result1.find(
      (post) => post.result.postInfo.id === parseInt(postId)
    );
    if (selectedPost) {
      return <WriteBoard postData={selectedPost.result} postId={postId} />;
    } else {
      return <div>게시글을 찾을 수 없습니다.</div>; // postId가 있을 경우 해당 게시글을 찾지 못하면 메시지 표시
    }
  } else {
    return <WriteBoard />; // postId가 없을 경우 새 게시글 작성
  }
};

export default PostForm;
