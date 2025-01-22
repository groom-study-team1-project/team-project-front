import styled from "styled-components";
import { Body, Thumbnail } from "../PostCard.style";

export const CustomBody = styled(Body)`
  flex-grow: 2;
  min-width: 200px;
  gap: 10px;
  padding: 10px 10px 10px 20px;
`;

export const CustomThumbnail = styled(Thumbnail)`
  flex-grow: 1;
  width: 100%;
  min-width: 200px;
  max-width: 260px; /* 최대 너비를 설정하여 비율 유지 */
  max-height: 200px;
`;
