import styled from "styled-components";
import {
  Interaction,
  ArrowButton,
  PostProfile,
  PostContent,
} from "./PostCardComponents";

const PostCardWrapper = styled.div`
  display: flex;
  border: 1px solid;
  width: 985px;
  height: 232px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 10px;
`;

const Thumbnail = styled.div`
  flex-grow: 1;
  border: 1px solid;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 10px 0 10px 10px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

function CommunityPostCard({ title, content, name, job, count }) {
  return (
    <PostCardWrapper>
      <InnerContainer>
        <Thumbnail />
        <Body>
          <PostActions>
            <PostProfile name={name} job={job} />
            <Interaction count={count} />
          </PostActions>
          <PostContent title={title} content={content} />
          <ArrowButton />
        </Body>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default CommunityPostCard;
