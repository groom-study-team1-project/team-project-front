import React from 'react';
import styled from 'styled-components';

const Post = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const PostText = styled.p`
  font-size: 14px;
  padding: 4px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
`;

const PopularPostMenuBar = ({ text, count }) => {
  return (
    <Post>
      <PostText>{`#${text}`}</PostText>
      <PostStats>{count}</PostStats>
    </Post>
  );
};

export default PopularPostMenuBar;
