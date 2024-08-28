import React, { useEffect, useState } from 'react';
import PopularContainer from './PopularContainer';
import { PopularHash } from './PopularCardComponents';
import { fetchPopularHashItems } from '../../services/api';

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
        <PopularHash key={hash.id} hashtag={hash.hashtag} count={hash.count} />
      ))}
    </PopularContainer>
  );
};

export default PopularHashCard;
