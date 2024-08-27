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
          setPosts(
            Array.from({ length: 5 }, () => ({ id: 0, title: 'DeepDivers' }))
          );
        }
      })
      .catch((error) => {
        console.error((err) => console.log(err.message));
      });
  }, []);

  return (
    <PopularContainer text="인기 게시글">
      {posts.map((post) => (
        <PopularPostMenubar key={post.id} text={post.title} />
      ))}
    </PopularContainer>
  );
};

export default PopularPostCard;
