import React, { useEffect, useState } from 'react';
import PopularContainer from './PopularContainer';
import PopularPostMenubar from './PopularPostMenubar';
import { fetchPopularPostItems } from '../../services/api';

const PopularPostCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPopularPostItems()
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
        <PopularPostMenubar key={i} text={posts[i] ? posts[i].title : '제목'} />
      );
    }
    return menuBars;
  };

  return (
    <PopularContainer text="인기 게시글">{renderMenuBars()}</PopularContainer>
  );
};

export default PopularPostCard;
