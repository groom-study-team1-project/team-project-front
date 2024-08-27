import React, { useEffect, useState } from 'react';
import PopularContainer from './PopularContainer';
import PopularHashMenubar from './PopularHashMenubar';
import { fetchPopularHashItems } from '../../services/api';

const PopularHashCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPopularHashItems()
      .then((data) => {
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch popular posts:', error);
        setPosts([]);
      });
  }, []);

  const renderMenuBars = () => {
    const menuBars = [];
    for (let i = 0; i < 5; i++) {
      menuBars.push(
        <PopularHashMenubar
          key={i}
          text={posts[i] ? posts[i].hashtag : '제목'}
          count={posts[i] ? posts[i].count : 0}
        />
      );
    }
    return menuBars;
  };

  return (
    <PopularContainer text="인기 해시태그">{renderMenuBars()}</PopularContainer>
  );
};

export default PopularHashCard;
