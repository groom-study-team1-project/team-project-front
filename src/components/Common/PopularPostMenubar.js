import React from 'react';
import styled from 'styled-components';
import { Interaction } from './Interactions';

const Post = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  display: column;
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
  padding-bottom: 8px;
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

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;

const Icon = styled.span`
  font-size: 12px;
  margin-right: 5px;
`;

const PopularPostMenuBar = ({
  text,
  count = { view: 0, like: 0, comment: 0 },
}) => {
  return (
    <Post>
      <PostText>{text}</PostText>
      <PostStats>
        <Interaction count={count} />
      </PostStats>
    </Post>
  );
};

export default PopularPostMenuBar;
