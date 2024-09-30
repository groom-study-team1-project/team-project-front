import {
  PostContainer,
  PostTitle,
} from "../NoticePostCard/NoticePostCard.style";
import { InteractionItem } from "../../../Common/Interactions";
import eyeIcon from "../../../../assets/images/eye.png";
import { useNavigate } from "react-router-dom";
import { InnerContainer, PostCardContainer } from "../PostCard.style";

function NoticePostCard({ id, title, date, count }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/board/detail/${id}`);
  };

  return (
    <PostCardContainer height="40px" onClick={handleNavigation}>
      <InnerContainer>
        <PostContainer>{id}</PostContainer>
        <PostTitle>{title}</PostTitle>
        <PostContainer>{date}</PostContainer>
        <PostContainer>
          <InteractionItem icon={eyeIcon} count={count.viewCount} />
        </PostContainer>
      </InnerContainer>
    </PostCardContainer>
  );
}

export default NoticePostCard;
