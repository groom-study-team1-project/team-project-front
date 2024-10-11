import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: ${({ $size }) => $size || "30px"};
  height: ${({ $size }) => $size || "30px"};
  border: 1px solid;
  border-radius: 50%;
  margin-right: ${({ $isBig }) => ($isBig ? "20px" : "10px")};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileInfoName = styled.p`
  font-size: ${({ $isBig }) => ($isBig ? "48px" : "14px")};
`;

const ProfileInfoJob = styled.p`
  font-size: ${({ $isBig }) => ($isBig ? "24px" : "13px")};
`;

const ProfileBox = ({ name, job, size, isBig, onClick, imgUrl }) => (
  <ProfileWrapper onClick={onClick}>
    <ProfileImage $size={size} $isBig={isBig} src={imgUrl} />
    <ProfileInfo>
      <ProfileInfoName $isBig={isBig}>{name}</ProfileInfoName>
      <ProfileInfoJob $isBig={isBig}>{job}</ProfileInfoJob>
    </ProfileInfo>
  </ProfileWrapper>
);

export const PostProfileBox = ({ name, job, memberId, imgUrl }) => {
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/my-page/${memberId}`);
  };

  return (
    <ProfileBox
      name={name}
      job={job}
      size="30px"
      isBig={false}
      imgUrl={imgUrl}
      onClick={handleProfileClick}
    />
  );
};

export const BigProfileBox = ({ nickName, job }) => (
  <ProfileBox name={nickName} job={job} size="200px" isBig={true} />
);
