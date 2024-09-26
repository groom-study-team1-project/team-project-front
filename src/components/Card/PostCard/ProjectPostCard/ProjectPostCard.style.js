import styled from "styled-components";
import { PostActions, Thumbnail } from "../PostCard.style";

export const CustomPostActions = styled(PostActions)`
  align-items: center;
  margin-top: 10px;
`;

export const CustomThumbnail = styled(Thumbnail)`
  max-height: 200px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5);
`;
