import { useState } from "react";
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

function ProjectPostCard({
                           id,
                           title,
                           content,
                           name,
                           job,
                           email,
                           count = { view: 0, like: 0, comment: 0 },
                           img,
                           thumbnail,
                         }) {
  const [imgIndex, setImgIndex] = useState(0);
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
        prevIndex < img.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
      <PostCardContainer onClick={handleNavigation}>
        <ProjectInnerContainer direction="column">
          <CustomThumbnail>
            {thumbnail ? (
                <img
                    src={thumbnail} // thumbnail을 사용
                    alt={`Thumbnail`}
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
              <Interaction count={count} />
              <ArrowButton
                  handlePrevImage={(e) => handlePrevImage(e)}
                  handleNextImage={(e) => handleNextImage(e)}
              />
            </CustomPostActions>
            <Divider />
            <ContentBox>
              <p>{title}</p>
              <p>{content}</p>
            </ContentBox>
            <Divider />
            <PostProfileBox name={name} job={job} email={email} />
          </Body>
        </ProjectInnerContainer>
      </PostCardContainer>
  );
}

export default ProjectPostCard;
