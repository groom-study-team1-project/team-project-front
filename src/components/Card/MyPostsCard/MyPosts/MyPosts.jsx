import React, { useEffect, useState } from "react";
import {
  MyPost,
  MypostThumbnail,
  MypostTitle,
  MypostDate,
  DateCountWrap,
  MypostTitleWrap,
  Hastags,
} from "./MyPosts.style";
import { Interaction } from "../../../Common/Interactions";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

export const MyPosts = ({ mypost }) => {
  const navigate = useNavigate();
  const isSmallDesktop = useMediaQuery({ maxWidth: 1480 });
  const { isMobile, isTablet } = useSelector((state) => state.screenSize);
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
          navigate(`/board/detail/${post.postId}`);
        }}
        $isSmallDesktop={isSmallDesktop}
        $isTablet={isTablet}
      >
        <MypostThumbnail src={post.thumbnail} />
        <MypostTitleWrap>
          <MypostTitle $isSmallDesktop={isSmallDesktop} $isTablet={isTablet}>
            {post.title}
          </MypostTitle>
          <div></div>
        </MypostTitleWrap>
        <DateCountWrap>
          <MypostDate $isSmallDesktop={isSmallDesktop} $isTablet={isTablet}>
            {postDate}
          </MypostDate>
          <Interaction
            count={{
              viewCount: post.viewCount,
              likeCount: post.likeCount,
              commentCount: post.commentCount,
            }}
          />
        </DateCountWrap>
        <Hastags>
          {post?.hashtags?.length > 0 ? (
            post.hashtags.map((hashtag, index) => (
              <div key={index}>#{hashtag}</div>
            ))
          ) : (
            <p>No hashtags available.</p>
          )}
        </Hastags>
      </MyPost>
    </>
  );
};
