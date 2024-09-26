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
    border: none;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.5)
    );
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.05),
      0 10px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
  }

  &:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid transparent;
    background: linear-gradient(
        10deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
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
