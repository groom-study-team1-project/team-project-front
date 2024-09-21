import { useState } from "react";
import { ArrowButton, Interaction } from "../../../Common/Interactions";
import {
  Body,
  ContentBox,
  InnerContainer,
  PostCardWrapper,
  Thumbnail,
} from "../PostCard.style";
import { PostProfileBox } from "../PostProfile";
import { CustomPostActions } from "./ProjectPostCard.style";
import { useNavigate } from "react-router-dom";

function ProjectPostCard({
  id,
  title,
  content,
  name,
  job,
  email,
  count = { view: 0, like: 0, comment: 0 },
  img,
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
    <PostCardWrapper width="280px" height="440px" onClick={handleNavigation}>
      <InnerContainer direction="column">
        <Thumbnail>
          {img ? <img src={img[imgIndex].url} alt={`img ${imgIndex}`} /> : null}
        </Thumbnail>
        <Body>
          <CustomPostActions>
            <Interaction count={count} />
            <ArrowButton
              handlePrevImage={(e) => handlePrevImage(e)}
              handleNextImage={(e) => handleNextImage(e)}
            />
          </CustomPostActions>
          <ContentBox>
            <p>{title}</p>
            <p>{content}</p>
          </ContentBox>
          <PostProfileBox name={name} job={job} email={email} />
        </Body>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default ProjectPostCard;
