import styled from "styled-components";

const ContentContainer = styled.div`
  flex-grow: 1;
  height: 120px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 10px 0;
  margin: 10px 0 10px 0;
`;

const ThumbnailWrapper = styled.div`
  flex-grow: 1;
  border: 1px solid;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const ProfileImage = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const PostProfile = ({ name, job }) => (
  <ProfileWrapper>
    <ProfileImage />
    <ProfileInfo>
      <p>{name}</p>
      <p>{job}</p>
    </ProfileInfo>
  </ProfileWrapper>
);

export const PostContent = ({ title, content }) => (
  <ContentContainer>
    <p>{title}</p>
    <p>{content}</p>
  </ContentContainer>
);

export const Thumbnail = () => <ThumbnailWrapper></ThumbnailWrapper>;
