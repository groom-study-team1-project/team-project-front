import styled from "styled-components";

export const ContentBox = styled.div`
  flex-grow: 1;
`;

export const Thumbnail = styled.div`
  flex-grow: 1;
  max-width: 260px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 15px 30px rgba(0, 0, 0, 0.15),
    0 20px 40px rgba(0, 0, 0, 0.25);

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
  padding: 16px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.5)
  );

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.1),
    0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);

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
