import styled from "styled-components";

export const Post = styled.div`
  height: 40px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const PostText = styled.p`
  font-size: 14px;
  padding: 4px;
  padding-bottom: 8px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostStats = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;
