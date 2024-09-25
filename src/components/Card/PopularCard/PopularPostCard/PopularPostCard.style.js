import styled from "styled-components";

export const Post = styled.div`
  height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: transparent;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: 1px solid white;

    background-color: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.5)
    );

    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.1),
      0 20px 40px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(20px);
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
