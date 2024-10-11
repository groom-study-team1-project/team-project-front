import React, { useEffect, useState } from "react";
import { fetchPopularPostItems } from "../../../../services/api/api";
import PopularContainer from "../PopularContainer";
import { Post, PostStats, PostText } from "./PopularPostCard.style";
import { Interaction } from "../../../Common/Interactions";
import { redirect, useNavigate } from "react-router-dom";
const PopularPostCard = () => {
  const [postItems, setPostItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPopularPostItems()
      .then((postItems) => setPostItems(postItems))
      .catch((err) => console.log(err));
  }, []);

  return (
    <PopularContainer text="인기 게시글">
      {postItems.slice(0, 5).map((post) => (
        <Post
          key={post.id}
          onClick={() => {
            navigate(`detail/${post.id}`);
          }}
        >
          <PostText>{post.title}</PostText>
          <PostStats>
            <Interaction count={post.count} />
          </PostStats>
        </Post>
      ))}
    </PopularContainer>
  );
};

export default PopularPostCard;
