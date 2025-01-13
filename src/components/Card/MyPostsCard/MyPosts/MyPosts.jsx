import React, { useEffect, useState } from "react";
import {
  MyPost,
  MypostThumbnail,
  MypostTitle,
  MypostDate,
  DateCountWrap,
  MypostTitleWrap,
} from "./MyPosts.style";
import { Interaction } from "../../../Common/Interactions";

import { useNavigate } from "react-router-dom";

export const MyPosts = ({ mypost }) => {
  const navigate = useNavigate();

  const [post, setPost] = useState("");
  const [postDate, setPostdate] = useState("");
  useEffect(() => {
    const formattedDate = new Date(
      new Date(mypost.createdAt).getTime() + 9 * 60 * 60 * 1000
    ).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour12: false,
    });
    setPostdate(formattedDate);
    setPost(mypost);
  }, [mypost, post]);
  if (post === null || "") {
    return <div>게시글을 불러오지 못했습니다.</div>;
  }
  return (
    <>
      <MyPost
        key={post.id}
        onClick={() => {
          navigate(`/board/detail/${post.id}`);
        }}
      >
        <MypostThumbnail src={post.thumbnail} />
        <MypostTitleWrap>
          <MypostTitle>{post.title}</MypostTitle>
          <div></div>
        </MypostTitleWrap>
        <DateCountWrap>
          <MypostDate>{postDate}</MypostDate>
          <Interaction
            count={{
              viewCount: post.viewCount,
              likeCount: post.likeCount,
              commentCount: post.commentCount,
            }}
          />
        </DateCountWrap>
      </MyPost>
    </>
  );
};
