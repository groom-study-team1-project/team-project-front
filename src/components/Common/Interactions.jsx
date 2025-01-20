import styled from "styled-components";
import eyeIcon from "../../assets/images/eye.png";
import eyeIconDark from "../../assets/images/eye-dark.png";
import heartIcon from "../../assets/images/heart.png";
import heartIconDark from "../../assets/images/heart-dark.png";
import commentIcon from "../../assets/images/comment.png";
import commentIconDark from "../../assets/images/comment-dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";

const InteractionsWrapper = styled.div`
    display: flex;
`;

const InteractionItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.3vw;
`;

const Icon = styled.img`
    width: 0.8vw;
    height: 0.8vw;
    margin-right: 0.2vw;
`;

const IconText = styled.span`
    font-size: 0.5vw;
`;

const ArrowContainer = styled.div`
    display: flex;
    width: 80px;
    height: 24px;
    background-color: transparent;
    border: 1px solid;
    border-color: ${({ isDarkMode }) =>
            isDarkMode
                    ? "rgba(0, 0, 0, 0.6)"
                    : "rgba(255, 255, 255, 0.6)"};
    border-radius: 16px;

    .divider {
        width: 1px;
        background-color: ${({ isDarkMode }) =>
                isDarkMode
                        ? "rgba(255, 255, 255, 0.25)"
                        : "rgba(0, 0, 0, 0.25)"};
    }
`;

const Arrow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    cursor: pointer;
`;

export const InteractionItem = ({ iconLight, iconDark, count, isDarkMode }) => (
    <InteractionItemWrapper>
        <Icon src={isDarkMode ? iconDark : iconLight} />
        <IconText>{count}</IconText>
    </InteractionItemWrapper>
);

export const Interaction = ({ count }) => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <InteractionsWrapper>
            <InteractionItem
                iconLight={eyeIcon}
                iconDark={eyeIconDark}
                count={count.viewCount}
                isDarkMode={isDarkMode}
            />
            <InteractionItem
                iconLight={heartIcon}
                iconDark={heartIconDark}
                count={count.likeCount}
                isDarkMode={isDarkMode}
            />
            <InteractionItem
                iconLight={commentIcon}
                iconDark={commentIconDark}
                count={count.commentCount}
                isDarkMode={isDarkMode}
            />
        </InteractionsWrapper>
    );
};

export const ArrowButton = ({ handlePrevImage, handleNextImage }) => {
    const [isPrevHovered, setIsPrevHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <ArrowContainer isDarkMode={isDarkMode}>
            <Arrow
                onMouseOver={() => setIsPrevHovered(true)}
                onMouseOut={() => setIsPrevHovered(false)}
                onClick={handlePrevImage}
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    color={isDarkMode
                        ? isPrevHovered
                            ? "#FFF"
                            : "rgba(255, 255, 255, 1)"
                        : isPrevHovered
                            ? "rgba(0, 0, 0, 0.25)"
                            : "rgba(0, 0, 0, 0.25)"}
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
                    color={isDarkMode
                        ? isNextHovered
                            ? "#FFF"
                            : "rgba(255, 255, 255, 1)"
                        : isNextHovered
                            ? "rgba(0, 0, 0, 0.25)"
                            : "rgba(0, 0, 0, 0.25)"}
                />
            </Arrow>
        </ArrowContainer>
    );
};
