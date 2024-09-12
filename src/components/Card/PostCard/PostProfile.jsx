import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.div`
  width: ${({ width }) => width || "30px"};
  height: ${({ height }) => height || "30px"};
  border: 1px solid;
  border-radius: 50%;
  margin-right: ${({ isbig }) => (isbig ? "20px" : "10px")};
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileInfoName = styled.p`
  font-size: ${({ isbig }) => (isbig ? "48px" : "14px")};
`;

export const ProfileInfoJob = styled.p`
  font-size: ${({ isbig }) => (isbig ? "24px" : "13px")};
`;

export const PostProfileBox = ({ name, job }) => (
  <ProfileWrapper>
    <ProfileImage />
    <ProfileInfo>
      <ProfileInfoName>{name}</ProfileInfoName>
      <ProfileInfoJob>{job}</ProfileInfoJob>
    </ProfileInfo>
  </ProfileWrapper>
);

export const EditProfileBox = ({ name, job }) => (
  <ProfileWrapper>
    <ProfileImage width="200px" height="200px" isbig={true} />
    <ProfileInfo>
      <ProfileInfoName isbig={true}>{name}</ProfileInfoName>
      <ProfileInfoJob isbig={true}>{job}</ProfileInfoJob>
    </ProfileInfo>
  </ProfileWrapper>
);
