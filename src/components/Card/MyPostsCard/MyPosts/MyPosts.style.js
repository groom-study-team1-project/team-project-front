import { ProfileImage } from "../../PostCard/PostProfile";
import styled from "styled-components";

export const MyPost = styled.div`
  margin: 24px;
  border-radius: 10px;
  padding: 16px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.5)
  );

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.1),
    0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);

  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
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

export const MyPostTitle = styled.div`
  padding: 10px;

  .title {
    font-size: 17px;
  }

  .post-count {
    font-size: 14px;
    padding-left: 5px;
  }
`;
