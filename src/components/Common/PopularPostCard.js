import React, { useEffect, useState } from "react";
import PopularContainer from "./PopularContainer";
import { PopularPost } from "./PopularCardComponents";
import { fetchPopularPostItems } from "../../services/api";

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
        <PopularPost
          key={post.id}
          title={post.title}
          content={post.content}
          name={post.name}
          job={post.job}
          count={post.count}
        />
      ))}
    </PopularContainer>
  );
};

export default PopularPostCard;
