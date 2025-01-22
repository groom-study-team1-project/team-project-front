import React, { useState } from "react";
import { ArrowButton, Interaction } from "../../../Common/Interactions";
import {
  Body,
  ContentBox,
  ProjectInnerContainer,
  PostCardContainer,
  PostTitle,
} from "../PostCard.style";
import { PostProfileBox } from "../PostProfile";
import { CustomPostActions, CustomThumbnail } from "./ProjectPostCard.style";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../Card.style";
import useJwt from "../../../../hooks/useJwt";
import { useSelector } from "react-redux";

function ProjectPostCard({
  id,
  title,
  content,
  name,
  job,
  profileImg,
  postImgs = [],
  count,
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );
  const memberId = payload.memberId;
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/board/detail/${id}`);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setImgIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setImgIndex((prevIndex) =>
      prevIndex < postImgs.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const processContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const textContent = doc.querySelectorAll("p");
    textContent.forEach((text) => {
      text.getAttribute("");
      text.replaceWith(text);
    });
    return doc.body.textContent || "";
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const defaultThumbnailUrl =
    "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/default-image/posts/thumbnail.png";

  return (
    <PostCardContainer onClick={handleNavigation}>
      <ProjectInnerContainer direction="column" $isDarkMode={isDarkMode}>
        <CustomThumbnail>
          {postImgs.length > 0 ? (
            <img
              src={postImgs[imgIndex]}
              alt={`Slide ${imgIndex + 1}`}
              style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={defaultThumbnailUrl}
              alt="Default Thumbnail"
              style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </CustomThumbnail>
        <Body>
          <CustomPostActions>
            <Interaction
              count={{
                viewCount: count.viewCount,
                likeCount: count.likeCount,
                commentCount: count.commentCount,
              }}
            />
            <ArrowButton
              handlePrevImage={(e) => handlePrevImage(e)}
              handleNextImage={(e) => handleNextImage(e)}
            />
          </CustomPostActions>
          <Divider />
          <ContentBox>
            <PostTitle>{truncateText(title, 12)}</PostTitle>{" "}
            <p>{truncateText(processContent(content), 100)}</p>{" "}
          </ContentBox>
          <Divider />
          <PostProfileBox
            name={name}
            job={job}
            memberId={memberId}
            imgUrl={profileImg}
          />
        </Body>
      </ProjectInnerContainer>
    </PostCardContainer>
  );
}

export default ProjectPostCard;
