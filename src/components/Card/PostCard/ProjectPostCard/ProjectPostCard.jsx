import React, { useState } from "react";
import { ArrowButton, Interaction } from "../../../Common/Interactions";
import {
  Body,
  ContentBox,
  ProjectInnerContainer,
  PostCardContainer,
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
  img,
  count,
  imgUrls = [], // imgUrls 배열 추가
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );
  const memberId = payload.memberId;

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
      prevIndex < imgUrls.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const processContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const imgElements = doc.querySelectorAll("img");

    imgElements.forEach((img) => {
      const imgSrc = img.getAttribute("src");
      if (imgSrc) {
        img.replaceWith(`[` + imgSrc + `]`);
      }
    });

    return doc.body.textContent || "";
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <PostCardContainer onClick={handleNavigation}>
      <ProjectInnerContainer direction="column">
        <CustomThumbnail>
          {imgUrls.length > 0 ? (
            <img
              src={imgUrls[imgIndex]}
              alt={`Slide ${imgIndex + 1}`}
              style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt="Default placeholder"
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
            <p>{truncateText(title, 30)}</p> {/* 제목 글자수 제한 */}
            <p>{truncateText(processContent(content), 100)}</p>{" "}
            {/* 내용 글자수 제한 */}
          </ContentBox>
          <Divider />
          <PostProfileBox
            name={name}
            job={job}
            memberId={memberId}
            imgUrl={img}
          />
        </Body>
      </ProjectInnerContainer>
    </PostCardContainer>
  );
}

export default ProjectPostCard;
