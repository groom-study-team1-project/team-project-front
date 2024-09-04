import {
  PostCardWrapper,
  InnerContainer,
  PostActions,
} from "../../Common/PostCardWrapper";
// Error > PostCardWrapper가 무슨 파일로 바뀐건지 찾을 수 없음

import { CustomBody } from "../CommunityPostCard/CommunityPostCard.style";
import { PostProfile, PostContent } from "../../PostCard/PostProfile";
// Error > PostContent가 이 파일안에 존재하지 않음

import { Thumbnail } from "../PostCard.style";
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
