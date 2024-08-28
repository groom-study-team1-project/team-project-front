import styled from "styled-components";
import { PostCardWrapper } from "../Common/PostCardWrapper";
import { InteractionItem } from "../Common/Interactions";
import eyeIcon from "../../assets/images/eye.png";

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

function NoticePostCard({ id, title, date, count }) {
  return (
    <CustomPostCardWrapper width="985px" height="40px">
      <PostContainer>{id}</PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostContainer>{date}</PostContainer>
      <PostContainer>
        <InteractionItem icon={eyeIcon} count={count.view} />
      </PostContainer>
    </CustomPostCardWrapper>
  );
}

export default NoticePostCard;
