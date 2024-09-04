import React, { useEffect, useState } from "react";
import { fetchPopularPostItems } from "../../../../services/api";
import PopularContainer from "../PopularContainer";
import { Post, PostStats, PostText } from "./PopularPostCard.style";
import { Interaction } from "../../../Common/Interactions";

const PopularPostCard = () => {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPopularPostItems()
      .then((postItems) => setPostItems(postItems))
      .catch((err) => console.log(err));
  });

  return (
    <PopularContainer text="인기 게시글">
      {postItems.slice(0, 5).map((post) => (
        <Post key={post.id}>
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
