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
  width: 280px;
  height: 440px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 10px;
`;

const Thumbnail = styled.div`
  flex-grow: 1;
  border: 1px solid;
`;

const Body = styled.div`
  padding: 10px 10px 0;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

function PostCard({ title, content, name, job }) {
  return (
    <PostCardWrapper>
      <InnerContainer>
        <Thumbnail />
        <Body>
          <PostActions>
            <Interaction />
            <ArrowButton />
          </PostActions>
          <PostContent title={title} content={content} />
          <PostProfile name={name} job={job} />
        </Body>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default PostCard;
