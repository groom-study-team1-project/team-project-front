import { PostCardWrapper, InnerContainer, Body } from "./PostCardWrapper";
import { CustomPostActions } from "../ProjectPostCard/ProjectPostCard.style";
import { PostContent, Thumbnail } from "../PostCard.style";
import { Interaction, ArrowButton } from "../../../Common/Interactions";
import PostProfile from "../PostProfile";

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
          <PostContent title={title} content={content} />
          <PostProfile name={name} job={job} />
        </Body>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default ProjectPostCard;
