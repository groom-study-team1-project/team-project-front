import React, { useEffect, useState } from "react";
import { fetchPopularHashItems } from "../../../../services/api";
import PopularContainer from "../PopularContainer";
import { Hash, HashText } from "./PopularHashCard.style";
import { PostStats } from "../PopularPostCard/PopularPostCard.style";

const PopularHashCard = () => {
  const [hashItems, sethashItems] = useState([]);

  useEffect(() => {
    fetchPopularHashItems()
      .then((hashItems) => sethashItems(hashItems))
      .catch((err) => console.log(err));
  });

  return (
    <PopularContainer text="인기 해시태그">
      {hashItems.slice(0, 5).map((hash) => (
        <Hash key={hash.id}>
          <HashText>{hash.hashtag}</HashText>
          <PostStats>{hash.count}</PostStats>
        </Hash>
      ))}
    </PopularContainer>
  );
};

export default PopularHashCard;
