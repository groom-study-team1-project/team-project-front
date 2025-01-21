import {
  PostContainer,
  PostTitle,
} from "./NoticePostCard.style";

import {Interaction} from "../../../Common/Interactions";
import { useNavigate } from "react-router-dom";
import { InnerContainer, PostCardContainer } from "../PostCard.style";
import React from "react";
import {useSelector} from "react-redux";

function NoticePostCard({ id, title, date, count }) {
  const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const handleNavigation = () => {
    navigate(`/board/detail/${id}`);
  };

  return (
    <PostCardContainer height="40px" onClick={handleNavigation}>
      <InnerContainer isDarkMode={isDarkMode}>
        <PostContainer>{id}</PostContainer>
        <PostTitle>{title}</PostTitle>
        <PostContainer>{date}</PostContainer>
        <PostContainer>
          <Interaction
              count={{
                viewCount: count.viewCount,
                likeCount: count.likeCount,
                commentCount: count.commentCount,
              }}
          />
        </PostContainer>
      </InnerContainer>
    </PostCardContainer>
  );
}

export default NoticePostCard;
