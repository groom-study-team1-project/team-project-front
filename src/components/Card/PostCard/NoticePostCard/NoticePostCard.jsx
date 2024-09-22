import {
  CustomPostCardWrapper,
  PostContainer,
  PostTitle,
} from "../NoticePostCard/NoticePostCard.style";
import { InteractionItem } from "../../../Common/Interactions";
import eyeIcon from "../../../../assets/images/eye.png";
import { useNavigate } from "react-router-dom";
import { InnerContainer } from "../PostCard.style";

function NoticePostCard({ id, title, date, count }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/board/detail/${id}`);
  };

  return (
    <CustomPostCardWrapper height="40px" onClick={handleNavigation}>
      <InnerContainer>
        <PostContainer>{id}</PostContainer>
        <PostTitle>{title}</PostTitle>
        <PostContainer>{date}</PostContainer>
        <PostContainer>
          <InteractionItem icon={eyeIcon} count={count.view} />
        </PostContainer>
      </InnerContainer>
    </CustomPostCardWrapper>
  );
}

export default NoticePostCard;
