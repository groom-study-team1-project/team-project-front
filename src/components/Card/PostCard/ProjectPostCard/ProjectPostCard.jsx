import { ArrowButton, Interaction } from "../../../Common/Interactions";
import {
  Body,
  ContentBox,
  InnerContainer,
  PostCardWrapper,
  Thumbnail,
} from "../PostCard.style";
import { PostProfileBox } from "../PostProfile";
import { CustomPostActions } from "./ProjectPostCard.style";
import { useNavigate } from "react-router-dom";

function ProjectPostCard({
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
    <PostCardWrapper width="280px" height="440px" onClick={handleNavigation}>
      <InnerContainer direction="column">
        <Thumbnail />
        <Body>
          <CustomPostActions>
            <Interaction count={count} />
            <ArrowButton />
          </CustomPostActions>
          <ContentBox>
            <p>{title}</p>
            <p>{content}</p>
          </ContentBox>
          <PostProfileBox name={name} job={job} />
        </Body>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default ProjectPostCard;
