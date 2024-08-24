import styled from "styled-components";
import eyeIcon from "../../assets/images/eye.png";
import heartIcon from "../../assets/images/heart.png";
import commentIcon from "../../assets/images/comment.png";

const InteractionsWrapper = styled.div`
  display: flex;
`;

const InteractionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

const IconText = styled.span`
  font-size: 13px;
`;

const DefaultArrow = styled.button`
  width: 40px;
  height: 24px;
  border-radius: 16px 0 0 16px;
`;

const MirroredArrow = styled(DefaultArrow)`
  transform: scaleX(-1);
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 120px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 10px 0;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const ProfileImage = styled.div`
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

const InteractionItem = ({ icon, count }) => (
  <InteractionItemWrapper>
    <Icon src={icon} />
    <IconText>{count}</IconText>
  </InteractionItemWrapper>
);

export const Interaction = ({ count }) => (
  <InteractionsWrapper>
    <InteractionItem icon={eyeIcon} count={count.view} />
    <InteractionItem icon={heartIcon} count={count.like} />
    <InteractionItem icon={commentIcon} count={count.comment} />
  </InteractionsWrapper>
);

export const ArrowButton = () => (
  <div>
    <DefaultArrow></DefaultArrow>
    <MirroredArrow></MirroredArrow>
  </div>
);

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
