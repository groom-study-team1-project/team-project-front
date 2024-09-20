import { ArrowButton, Interaction } from "../../../Common/Interactions";
import {
  ContentBox,
  InnerContainer,
  PostActions,
  PostCardWrapper,
  Thumbnail,
} from "../PostCard.style";
import { PostProfileBox } from "../PostProfile";
import { CustomBody } from "./CommunityPostCard.style";
import { useNavigate } from "react-router-dom";

function CommunityPostCard({
  id,
  title,
  content,
  name,
  job,
  count = { view: 0, like: 0, comment: 0 },
}) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/board/detail/${id}`);
  };

  return (
    <PostCardWrapper height="232px" onClick={handleNavigation}>
      <InnerContainer>
        <Thumbnail />
        <CustomBody>
          <PostActions>
            <PostProfileBox name={name} job={job} />
            <Interaction count={count} />
          </PostActions>
          <ContentBox>
            <p>{title}</p>
            <p>{content}</p>
          </ContentBox>
          <ArrowButton />
        </CustomBody>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default CommunityPostCard;
