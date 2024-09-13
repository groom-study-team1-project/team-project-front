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

function CommunityPostCard({
  title,
  content,
  name,
  job,
  count = { view: 0, like: 0, comment: 0 },
}) {
  return (
    <PostCardWrapper height="232px">
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
