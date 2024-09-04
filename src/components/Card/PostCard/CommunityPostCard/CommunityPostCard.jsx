import styled from "styled-components";
import {
  PostCardWrapper,
  InnerContainer,
  Body,
  PostActions,
} from "../../Common/PostCardWrapper";
import {
  PostProfile,
  PostContent,
  Thumbnail,
} from "../../Common/PostCardComponents";
import { Interaction, ArrowButton } from "../../../Common/Interactions";

function CommunityPostCard({
  title,
  content,
  name,
  job,
  count = { view: 0, like: 0, comment: 0 },
}) {
  return (
    <PostCardWrapper width="985px" height="232px">
      <InnerContainer>
        <Thumbnail />
        <CustomBody>
          <PostActions>
            <PostProfile name={name} job={job} />
            <Interaction count={count} />
          </PostActions>
          <PostContent title={title} content={content} />
          <ArrowButton />
        </CustomBody>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default CommunityPostCard;
