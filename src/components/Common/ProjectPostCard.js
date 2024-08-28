import styled from "styled-components";
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
  margin-top: 10px;
`;

function ProjectPostCard({ title, content, name, job, count }) {
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
