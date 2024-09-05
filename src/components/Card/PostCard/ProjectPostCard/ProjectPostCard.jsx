import { ArrowButton, Interaction } from "../../../Common/Interactions";
import {
  Body,
  ContentBox,
  InnerContainer,
  PostCardWrapper,
  Thumbnail,
} from "../PostCard.style";
import { PostProfile } from "../PostProfile";
import { CustomPostActions } from "./ProjectPostCard.style";

function ProjectPostCard({
  title,
  content,
  name,
  job,
  count = { view: 0, like: 0, comment: 0 },
}) {
  return (
    <PostCardWrapper width="280px" height="440px">
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
          <PostProfile name={name} job={job} />
        </Body>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default ProjectPostCard;
