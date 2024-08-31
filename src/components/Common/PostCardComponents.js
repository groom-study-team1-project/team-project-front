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
  flex-direction: column;
`;

const ProfileInput = styled.input`
  &:disabled {
    background-color: transparent;
    border: none;
  }
`;

export const PostProfile = ({ name, job, isDisabled = true }) => (
  <ProfileWrapper>
    <ProfileImage />
    <ProfileInfo>
      <ProfileInput value={name} disabled={isDisabled} />
      <ProfileInput value={job} disabled={isDisabled} />
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
