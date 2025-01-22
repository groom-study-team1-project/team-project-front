import styled from "styled-components";
import { Body, Thumbnail } from "../PostCard.style";

export const CustomBody = styled(Body)`
  flex-grow: 2;
  min-width: 200px;
  gap: 10px;
  padding: 10px 10px 10px 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CustomThumbnail = styled(Thumbnail)`
  flex-grow: 0;
  flex-shrink: 0;
  width: 30%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
