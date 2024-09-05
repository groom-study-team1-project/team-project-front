import styled from "styled-components";
import { PostCardWrapper } from "../PostCard.style";

export const CustomPostCardWrapper = styled(PostCardWrapper)`
  display: flex;
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
`;

export const PostTitle = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;
