import styled from "styled-components";

export const ContentBox = styled.div`
  flex-grow: 1;
  height: 120px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 10px 0;
  margin: 10px 0 10px 0;
`;

export const Thumbnail = styled.div`
  flex-grow: 1;
  max-width: 260px;
  border: 1px solid;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostCardWrapper = styled.div`
  position: relative;
  display: flex;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  cursor: pointer;
  transition: transform 450ms;

  &:hover {
    transform: scale(1.025);
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  flex-grow: 1;
  padding: 10px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.5)
  );

  &::before {
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

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0 10px;
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
