import styled from "styled-components";
// Error > PostCardWrapper 에러 발생
const CustomPostCardWrapper = styled(PostCardWrapper)`
  display: flex;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
`;

const PostTitle = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;
