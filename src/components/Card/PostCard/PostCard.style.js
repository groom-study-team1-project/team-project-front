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
  border: 1px solid;
`;

export const PostCardWrapper = styled.div`
  display: flex;
  border: 1px solid;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  flex-grow: 1;
  margin: 10px;
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

