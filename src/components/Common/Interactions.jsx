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

export const InteractionItem = ({ icon, count }) => (
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

export const ArrowButton = ({ handlePrevImage, handleNextImage }) => (
  <div>
    <DefaultArrow onClick={handlePrevImage}></DefaultArrow>
    <MirroredArrow onClick={handleNextImage}></MirroredArrow>
  </div>
);
