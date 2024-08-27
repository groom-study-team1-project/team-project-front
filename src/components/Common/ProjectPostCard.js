import {
  PostCardWrapper,
  InnerContainer,
  Body,
  PostActions,
} from "./PostCardWrapper";
import { PostProfile, PostContent, Thumbnail } from "./PostCardComponents";
import { Interaction, ArrowButton } from "./Interactions";

const CustomPostActions = styled(PostActions)`
  align-items: center;
  margin: 10px 0;
`;

function ProjectPostCard({ title, content, name, job, count }) {
  return (
    <PostCardWrapper>
      <InnerContainer>
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
