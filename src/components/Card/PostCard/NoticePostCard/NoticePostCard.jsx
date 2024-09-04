import {
  CustomPostCardWrapper,
  PostContainer,
  PostTitle,
} from "../NoticePostCard/NoticePostCard.style";
import { InteractionItem } from "../../../Common/Interactions";
import eyeIcon from "../../assets/images/eye.png";

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
