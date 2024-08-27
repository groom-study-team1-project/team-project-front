import styled from "styled-components";

export const PostCardWrapper = styled.div`
  display: flex;
  border: 1px solid;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
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
