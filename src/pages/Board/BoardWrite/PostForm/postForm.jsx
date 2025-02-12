import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux의 useSelector 훅
import WriteBoard from "../WriteBoard/BoardWrite";
import { fetchPostDetail, fetchProjectPostDetail } from "../../../../services/api/postApi";

const PostForm = () => {
  const { postId } = useParams(); // URL에서 postId 가져오기
  const [post, setPost] = useState(null);

  // Redux에서 categoryId 가져오기
  const categoryId = useSelector((state) => state.category.selectedCategoryId);

  useEffect(() => {
    if (!postId || !categoryId) return; // postId 또는 categoryId가 없으면 요청하지 않음

    const fetchData = async () => {
      try {
        if (categoryId === 2) {
          // categoryId가 2이면 프로젝트 게시판 데이터 호출
          const projectPostResponse = await fetchProjectPostDetail(postId);
          setPost(projectPostResponse);
        } else {
          // 일반 게시판 데이터 유지
          const postResponse = await fetchPostDetail(postId);
          setPost(postResponse);
        }
      } catch (error) {
        console.error("데이터를 가져오는데 실패", error);
      }
    };

    fetchData();
  }, [postId, categoryId]);

  const imgList = {
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
  };

  if (postId) {
    if (post) {
      return <WriteBoard postData={post} imgList={imgList} postId={postId} />;
    } else {
      return <div>게시글을 찾을 수 없습니다.</div>; // postId가 있을 경우 해당 게시글을 찾지 못하면 메시지 표시
    }
  } else {
    return <WriteBoard />; // postId가 없을 경우 새 게시글 작성
  }
};

export default PostForm;
