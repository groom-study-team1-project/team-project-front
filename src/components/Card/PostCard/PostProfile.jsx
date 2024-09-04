import styled from "styled-components";

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.div`
  width: ${({ width }) => width || "30px"};
  height: ${({ height }) => height || "30px"};
  border: 1px solid;
  border-radius: 50%;
  margin-right: ${({ isBig }) => (isBig ? "20px" : "10px")};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileInfoName = styled.p`
  font-size: ${({ isBig }) => (isBig ? "48px" : "14px")};
`;

const ProfileInfoJob = styled.p`
  font-size: ${({ isBig }) => (isBig ? "24px" : "13px")};
`;

export const PostProfile = ({ name, job }) => (
  <ProfileWrapper>
    <ProfileImage />
    <ProfileInfo>
      <ProfileInfoName>{name}</ProfileInfoName>
      <ProfileInfoJob>{job}</ProfileInfoJob>
    </ProfileInfo>
  </ProfileWrapper>
);

export const EditProfile = ({ name, job }) => (
  <ProfileWrapper>
    <ProfileImage width="200px" height="200px" isBig={true} />
    <ProfileInfo>
      <ProfileInfoName isBig={true}>{name}</ProfileInfoName>
      <ProfileInfoJob isBig={true}>{job}</ProfileInfoJob>
    </ProfileInfo>
  </ProfileWrapper>
);
