import styled from "styled-components";
import eyeIcon from "../../assets/images/eye.png";
import heartIcon from "../../assets/images/heart.png";
import commentIcon from "../../assets/images/comment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const InteractionsWrapper = styled.div`
  display: flex;
`;

const InteractionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10%;
`;

const Icon = styled.img`
  width: 80%;
  height: 80%;
  margin-right: 10%;
`;

const IconText = styled.span`
  font-size: 100%;
`;

const ArrowContainer = styled.div`
  display: flex;
  width: 80px;
  height: 24px;
  background-color: transparent;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  .divider {
    width: 1px;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
`;

export const InteractionItem = ({ icon, count }) => (
  <InteractionItemWrapper>
    <Icon src={icon} />
    <IconText>{count}</IconText>
  </InteractionItemWrapper>
);

export const Interaction = ({ count }) => (
  <InteractionsWrapper>
    <InteractionItem icon={eyeIcon} count={count.viewCount} />
    <InteractionItem icon={heartIcon} count={count.likeCount} />
    <InteractionItem icon={commentIcon} count={count.commentCount} />
  </InteractionsWrapper>
);

export const ArrowButton = ({ handlePrevImage, handleNextImage }) => {
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  return (
    <ArrowContainer>
      <Arrow
        onMouseOver={() => setIsPrevHovered(true)}
        onMouseOut={() => setIsPrevHovered(false)}
        onClick={handlePrevImage}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          color={isPrevHovered ? "" : "rgba(0, 0, 0, 0.25)"}
        />
      </Arrow>
      <div className="divider"></div>
      <Arrow
        onMouseOver={() => setIsNextHovered(true)}
        onMouseOut={() => setIsNextHovered(false)}
        onClick={handleNextImage}
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          color={isNextHovered ? "" : "rgba(0, 0, 0, 0.25)"}
        />
      </Arrow>
    </ArrowContainer>
  );
};
