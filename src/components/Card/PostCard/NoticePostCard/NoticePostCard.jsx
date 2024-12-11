import {
  PostContainer,
  PostTitle,
} from "./NoticePostCard.style";

import {Interaction} from "../../../Common/Interactions";
import { useNavigate } from "react-router-dom";
import { InnerContainer, PostCardContainer } from "../PostCard.style";
import React from "react";

function NoticePostCard({ id, title, date, count }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/board/detail/${id}`);
  };

  return (
    <PostCardContainer height="40px" onClick={handleNavigation}>
      <InnerContainer>
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
